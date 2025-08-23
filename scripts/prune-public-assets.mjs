#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const publicDir = path.join(root, 'public');

/** Recursively list files */
function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

/** Return all text files to search */
function listSearchFiles() {
  const includeDirs = ['app', 'pages', 'styles', 'src', 'components', 'public', ''];
  const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.scss', '.md', '.mdx', '.json', '.html', '.txt', '.yml', '.yaml', '.mjsx']);
  const files = [];
  for (const d of includeDirs) {
    const dir = path.join(root, d);
    if (!fs.existsSync(dir)) continue;
    const toWalk = [dir];
    while (toWalk.length) {
      const cur = toWalk.pop();
      const ents = fs.readdirSync(cur, { withFileTypes: true });
      for (const e of ents) {
        const fp = path.join(cur, e.name);
        if (e.isDirectory()) {
          // Skip node_modules and .next
          if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue;
          toWalk.push(fp);
        } else {
          const ext = path.extname(fp).toLowerCase();
          if (exts.has(ext)) files.push(fp);
        }
      }
    }
  }
  return Array.from(new Set(files));
}

function toPublicPath(filePath) {
  const rel = path.relative(publicDir, filePath).split(path.sep).join('/');
  return '/' + rel;
}

function fileContains(fp, needles) {
  try {
    const txt = fs.readFileSync(fp, 'utf8');
    for (const n of needles) {
      if (!n) continue;
      if (txt.includes(n)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.error('No public directory at', publicDir);
    process.exit(1);
  }

  const args = new Set(process.argv.slice(2));
  const doDelete = args.has('--delete');
  const toTrash = args.has('--trash') || (!doDelete);

  const assets = listFiles(publicDir);
  const searchFiles = listSearchFiles();

  const keep = new Set();
  const candidates = [];
  for (const a of assets) {
    const rel = toPublicPath(a);
    // Ignore .trash folder
    if (rel.startsWith('/.trash')) { keep.add(a); continue; }
    // Consider only media assets
    const ext = path.extname(a).toLowerCase();
    const mediaExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov', '.ico', '.mp3', '.wav']);
    if (!mediaExts.has(ext)) { keep.add(a); continue; }

    // Build needles: exact public path, and basename only as fallback
    const needles = new Set([rel, encodeURI(rel), rel.replace(/ /g, '%20'), path.basename(a)]);

    let referenced = false;
    for (const sf of searchFiles) {
      if (fileContains(sf, needles)) { referenced = true; break; }
    }

    if (referenced) {
      keep.add(a);
    } else {
      candidates.push(a);
    }
  }

  // Report
  console.log(`Scanned ${assets.length} files in public/`);
  console.log(`Search corpus: ${searchFiles.length} files`);
  console.log(`Referenced/kept: ${keep.size}`);
  console.log(`Unreferenced candidates: ${candidates.length}`);

  if (candidates.length) {
    const trashDir = path.join(publicDir, '.trash');
    if (toTrash) {
      if (!fs.existsSync(trashDir)) fs.mkdirSync(trashDir, { recursive: true });
      for (const f of candidates) {
        const rel = path.relative(publicDir, f);
        const dest = path.join(trashDir, rel);
        const destDir = path.dirname(dest);
        fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(f, dest);
        console.log(`Moved to trash: ${toPublicPath(f)}`);
      }
      console.log(`Moved ${candidates.length} files to ${path.relative(root, trashDir)}`);
    } else if (doDelete) {
      for (const f of candidates) {
        fs.rmSync(f, { force: true });
        console.log(`Deleted: ${toPublicPath(f)}`);
      }
      console.log(`Deleted ${candidates.length} files.`);
    }
  }
}

main();
