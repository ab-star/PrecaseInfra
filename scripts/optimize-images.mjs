#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Lazy-load sharp only if present
let sharpAvailable = true;
let sharpModule;
try { sharpModule = await import('sharp'); } catch { sharpAvailable = false; }

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
// In-place overwrite (OUT_DIR intentionally same as PUBLIC_DIR)

const VIDEO_EXT = new Set(['.mp4', '.webm']);
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const REPORT = args.includes('--report') || DRY;

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const targets = [];
for (const f of walk(PUBLIC_DIR)) {
  const ext = path.extname(f).toLowerCase();
  if (IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext)) targets.push(f);
}

const stats = [];
for (const file of targets) {
  const ext = path.extname(file).toLowerCase();
  const rel = path.relative(ROOT, file);
  const before = fs.statSync(file).size;
  let after = before;
  let action = 'skip';
  try {
    if (IMAGE_EXT.has(ext) && sharpAvailable) {
      // Heuristic: resize if width > 2000px, convert to webp if not already, strip metadata
      const buf = fs.readFileSync(file);
  const sharp = sharpModule.default || sharpModule;
  let img = sharp(buf, { failOnError: false });
      const meta = await img.metadata();
      if (meta.width && meta.width > 2000) {
        img = img.resize({ width: 2000 });
        action = 'resize';
      }
      if (ext !== '.webp') {
        img = img.webp({ quality: 78 });
        action = action === 'resize' ? 'resize+webp' : 'webp';
      } else {
        img = img.webp({ quality: 80 });
        if (action === 'skip') action = 'recompress';
      }
      img = img.withMetadata({ exif: false, icc: false });
      const outBuf = await img.toBuffer();
      after = outBuf.length;
      if (!DRY && after < before) {
        fs.writeFileSync(file.endsWith('.webp') ? file : file.replace(ext, '.webp'), outBuf);
  // Keep original alongside optimized variant to avoid broken references.
  // (Follow-up: update code to point to .webp then prune originals once verified.)
      }
    } else if (VIDEO_EXT.has(ext)) {
      // Placeholder: need ffmpeg for real compression; just report.
      action = 'video-pass';
    }
  } catch (err) {
    // Attempt a minimal fallback: if image, try simple webp conversion only
    if (IMAGE_EXT.has(ext) && sharpAvailable) {
      try {
        const buf = fs.readFileSync(file);
        const sharp = sharpModule.default || sharpModule;
        const outBuf = await (sharp(buf, { failOnError: false }).webp({ quality: 70 }).toBuffer());
        after = outBuf.length;
        if (!DRY && after < before) {
          fs.writeFileSync(file.endsWith('.webp') ? file : file.replace(ext, '.webp'), outBuf);
          action = 'fallback-webp';
        } else {
          action = 'fallback-skip';
        }
      } catch (inner) {
        action = 'error';
        console.error('[optimize-images] failed', rel, (inner && inner.message) || inner);
      }
    } else {
      action = 'error';
      console.error('[optimize-images] error', rel, (err && err.message) || err);
    }
  }
  stats.push({ file: rel, before, after, saving: before - after, action });
}

if (REPORT) {
  const totalBefore = stats.reduce((a,b)=>a+b.before,0);
  const totalAfter = stats.reduce((a,b)=>a+b.after,0);
  const saved = totalBefore - totalAfter;
  console.log(`Analyzed ${stats.length} assets.`);
  console.log(`Total before: ${(totalBefore/1024/1024).toFixed(2)} MB`);
  console.log(`Total after : ${(totalAfter/1024/1024).toFixed(2)} MB`);
  console.log(`Savings     : ${(saved/1024/1024).toFixed(2)} MB (${(saved/totalBefore*100).toFixed(1)}%)`);
  console.table(stats.slice(0,30));
  if (stats.length > 30) console.log(`... ${stats.length-30} more`);
}

if (!sharpAvailable) {
  console.warn('sharp not installed; only reporting possible. Install sharp to enable compression.');
}
