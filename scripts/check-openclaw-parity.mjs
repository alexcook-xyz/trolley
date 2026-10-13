import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const product = await readFile(resolve(root, 'docs/product-brief.md'), 'utf8');
const flight = await readFile(resolve(root, 'docs/flight-plan.md'), 'utf8');
const ui = await readFile(resolve(root, 'docs/ui-design-brief.md'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(`OpenClaw parity check failed: ${message}`);
}

for (const text of ['OpenClaw parity', 'gateway', 'Channels', 'Automation', 'Workspace memory', 'Remote approvals']) {
  assert(product.includes(text), `product brief covers ${text}`);
}
assert(flight.includes('OpenClaw parity'), 'flight plan has a parity phase');
assert(ui.includes('Automation'), 'ui brief covers automation');
assert(html.includes('data-settings-panel="automation"'), 'prototype has an automation settings panel');
assert(html.includes('Workspace memory'), 'prototype shows workspace memory');

console.log('OpenClaw parity check passed.');
