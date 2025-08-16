#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const VIDEO_EXT = new Set(['.mp4', '.webm']);
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const TARGET_MAX_WIDTH = 1920; // downscale larger
const CRF = 28; // quality factor (lower=better higher=smaller)
const MAX_PARALLEL = 2;

if (!ffmpegPath) {
  console.error('ffmpeg-static not found. Install dependency.');
  process.exit(1);
}

function *walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full); else yield full;
  }
}

const videos = [];
for (const f of walk(PUBLIC_DIR)) {
  const ext = path.extname(f).toLowerCase();
  if (VIDEO_EXT.has(ext)) videos.push(f);
}

// Placeholder dimension probe (could integrate ffprobe later)
async function probeDimensions() { return { width: TARGET_MAX_WIDTH + 1 }; }

function convertVideo(input, output) {
  return new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-i', input,
      '-vf', `scale='min(${TARGET_MAX_WIDTH},iw)':-2`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(CRF),
      '-c:a', 'aac', '-b:a', '128k',
      output
    ];
    const proc = spawn(ffmpegPath, args, { stdio: 'inherit' });
    proc.on('exit', code => code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code)) );
  });
}

const results = [];
let active = 0; let idx = 0; let resolveAll; const allDone = new Promise(r => resolveAll = r);

function next() {
  if (idx >= videos.length && active === 0) return resolveAll();
  while (active < MAX_PARALLEL && idx < videos.length) {
    const file = videos[idx++];
    processFile(file).catch(e => console.error('Error optimizing', file, e));
  }
}

async function processFile(file) {
  active++;
  const rel = path.relative(ROOT, file);
  try {
    const statBefore = fs.statSync(file).size;
  await probeDimensions();
    const tempOut = file.replace(/\.(mp4|webm)$/i, '.optimized.mp4');
    if (DRY) {
      results.push({ file: rel, before: statBefore, after: statBefore, saved: 0, action: 'dry-run' });
    } else {
      await convertVideo(file, tempOut);
      const statAfter = fs.statSync(tempOut).size;
      if (statAfter < statBefore * 0.98) { // at least 2% smaller
        fs.renameSync(tempOut, file); // replace
        results.push({ file: rel, before: statBefore, after: statAfter, saved: statBefore - statAfter, action: 'optimized' });
      } else {
        fs.unlinkSync(tempOut);
        results.push({ file: rel, before: statBefore, after: statBefore, saved: 0, action: 'no-gain' });
      }
    }
  } catch (e) {
    results.push({ file: rel, before: 0, after: 0, saved: 0, action: 'error', error: e.message });
  } finally {
    active--; next();
  }
}

next();
await allDone;

const totalBefore = results.reduce((a,b)=>a+b.before,0);
const totalAfter = results.reduce((a,b)=>a+b.after,0);
const saved = totalBefore - totalAfter;
console.log(`Videos processed: ${results.length}`);
console.log(`Total before: ${(totalBefore/1024/1024).toFixed(2)} MB`);
console.log(`Total after : ${(totalAfter/1024/1024).toFixed(2)} MB`);
console.log(`Saved       : ${(saved/1024/1024).toFixed(2)} MB (${(saved/totalBefore*100||0).toFixed(1)}%)`);
console.table(results);
