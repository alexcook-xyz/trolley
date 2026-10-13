import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const product = await readFile(resolve(root, 'docs/product-brief.md'), 'utf8');
const ui = await readFile(resolve(root, 'docs/ui-design-brief.md'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(`Frontier check failed: ${message}`);
}

// Score first: the briefs define evals before parallel agents.
for (const [name, text] of [['product brief', product], ['ui brief', ui]]) {
  assert(text.includes('Score first'), `${name} defines score first`);
  assert(text.includes('tournament'), `${name} defines agent tournaments`);
}

// Prototype: a folded tournament result with a clear winner.
const tournament = html.match(/<details class="rw-activity rw-tournament">[\s\S]*?<\/details>/);
assert(tournament, 'tournament details are present in chat');
assert(tournament[0].includes('Winner'), 'tournament names a winner');
assert((tournament[0].match(/Score/g) || []).length >= 3, 'tournament shows scores for three agents');

// Rapid ship for the user: review shows a ship-readiness gate.
const review = html.match(/<section class="rw-review[\s\S]*?<section class="rw-repository-page/);
assert(review, 'review section is present');
assert(review[0].includes('Ship readiness'), 'review shows ship readiness');
assert(review[0].includes('Rollback'), 'ship readiness includes a rollback point');

console.log('Frontier check passed.');
