// Run with: node scripts/check-copy.js (or npm run check:copy)
// Fails the build conventions check when:
//   1. An em dash appears in a .tsx/.ts file under app/ or components/ (rendered copy rule)
//   2. A css module sets a border-radius other than 0
const fs = require('fs');
const path = require('path');

const ROOTS = ['app', 'components'];
const failures = [];

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, cb);
    else cb(p);
  }
}

for (const root of ROOTS) {
  walk(path.join(process.cwd(), root), (file) => {
    const rel = path.relative(process.cwd(), file);
    if (/\.(tsx|ts)$/.test(file)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (line.includes('—')) {
          failures.push(`${rel}:${i + 1} contains an em dash`);
        }
      });
    }
    if (/\.css$/.test(file)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        const m = line.match(/border-radius:\s*([^;]+);/);
        if (m && !/^0(px|rem|em)?\s*$/.test(m[1].trim())) {
          failures.push(`${rel}:${i + 1} sets border-radius ${m[1].trim()}`);
        }
      });
    }
  });
}

if (failures.length) {
  console.error('check-copy failed:');
  failures.forEach((f) => console.error('  ' + f));
  process.exit(1);
}
console.log('check-copy passed: no em dashes, no rounded corners.');
