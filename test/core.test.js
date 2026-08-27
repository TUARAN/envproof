import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { audit } from '../src/core.js';

test('finds missing and stale variables', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'envproof-'));
  const source = ['const a = process', '.env.API_KEY; const b = process', '.env.PORT;'].join('');
  fs.writeFileSync(path.join(root, 'app.ts'), source);
  fs.writeFileSync(path.join(root, '.env.example'), 'PORT=3000\nOLD_KEY=\n');
  const result = audit(root);
  assert.deepEqual(result.missing, ['API_KEY']);
  assert.deepEqual(result.stale, ['OLD_KEY']);
  assert.deepEqual(result.ok, ['PORT']);
});
