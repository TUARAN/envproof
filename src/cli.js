#!/usr/bin/env node
import { audit } from './core.js';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: envproof [directory] [--json] [--no-fail]\n\nCompare environment variables used in code with .env.example.');
  process.exit(0);
}
if (args.includes('--version') || args.includes('-v')) {
  console.log('0.1.0');
  process.exit(0);
}
const json = args.includes('--json');
const noFail = args.includes('--no-fail');
const root = args.find(arg => !arg.startsWith('-')) || '.';
const result = audit(root);
if (json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`\n  envproof  ${result.example}`);
  console.log(`  ${'─'.repeat(56)}`);
  console.log(`  ✓ ${result.ok.length} documented and used`);
  for (const name of result.missing) {
    const hit = result.usages.find(item => item.name === name);
    console.log(`  ✗ ${name.padEnd(28)} missing  ${hit.file}:${hit.line}`);
  }
  for (const name of result.stale) console.log(`  ? ${name.padEnd(28)} documented but unused`);
  console.log(`\n  ${result.missing.length || result.stale.length ? 'Drift found.' : 'Your example file matches the code.'}\n`);
}
if (!noFail && (result.missing.length || result.stale.length)) process.exitCode = 1;
