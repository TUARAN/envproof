import fs from 'node:fs';
import path from 'node:path';

const SKIP = new Set(['.git', 'node_modules', 'vendor', 'dist', 'build', '.next', 'coverage']);
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.py', '.go', '.rs', '.rb', '.php', '.java', '.kt', '.sh', '.yml', '.yaml']);
const PATTERNS = [
  /(?:process|import\.meta)\.env\.([A-Z][A-Z0-9_]*)/g,
  /(?:process|import\.meta)\.env\[['"]([A-Z][A-Z0-9_]*)['"]\]/g,
  /(?:os\.getenv|os\.environ\.get|Deno\.env\.get|std::env::var|System\.getenv|env)\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g,
  /os\.environ\[['"]([A-Z][A-Z0-9_]*)['"]\]/g,
  /os\.Getenv\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g
];

export function walk(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (SKIP.has(entry.name) || entry.name.startsWith('.env')) continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

export function scanFile(file, root = path.dirname(file)) {
  const text = fs.readFileSync(file, 'utf8');
  const found = [];
  for (const pattern of PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const line = text.slice(0, match.index).split(/\r?\n/).length;
      found.push({ name: match[1], file: path.relative(root, file), line });
    }
  }
  return found;
}

export function parseExample(file) {
  if (!fs.existsSync(file)) return new Set();
  return new Set(fs.readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=/)?.[1]).filter(Boolean));
}

export function audit(root, exampleName = '.env.example') {
  root = path.resolve(root);
  const usages = walk(root).flatMap(file => scanFile(file, root));
  const used = new Set(usages.map(item => item.name));
  const documented = parseExample(path.join(root, exampleName));
  return {
    root,
    example: exampleName,
    usages,
    missing: [...used].filter(name => !documented.has(name)).sort(),
    stale: [...documented].filter(name => !used.has(name)).sort(),
    ok: [...used].filter(name => documented.has(name)).sort()
  };
}
