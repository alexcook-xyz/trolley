import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const brief = await readFile(resolve(root, 'docs/ui-design-brief.md'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(`Progressive disclosure check failed: ${message}`);
}

function detailsBlock(id) {
  const match = html.match(new RegExp(`<details class="${id}"[^>]*>([\\s\\S]*?)</details>`));
  assert(match, `${id} disclosure is present`);
  return match;
}

// Level 0: the composer keeps only task mode and Send visible by default.
const runOptions = detailsBlock('rw-run-options');
assert(!runOptions[0].startsWith('<details class="rw-run-options" open'), 'run options start collapsed');
for (const label of ['Active agent', 'Agent model', 'Edit active agent']) {
  assert(runOptions[1].includes(label), `run options contain ${label}`);
}
const composerTools = html.match(/<div class="rw-composer-tools">([\s\S]*?)<div class="rw-model-source">/);
assert(composerTools, 'composer tools are present');
assert(/<select aria-label="Task mode">/.test(composerTools[1].split('<details')[0]), 'task mode stays on the default surface');
assert(/data-action="send"/.test(composerTools[1]), 'send stays on the default surface');

// Level 2: agent power fields live behind a collapsed disclosure, name/template stay visible.
const agentPower = detailsBlock('rw-agent-power');
assert(!agentPower[0].startsWith('<details class="rw-agent-power" open'), 'agent power options start collapsed');
for (const label of ['Agent instructions', 'Agent model override', 'Recommended skills']) {
  assert(agentPower[1].includes(label), `agent power options contain ${label}`);
}
const agentEditor = html.match(/<div class="rw-agent-editor">([\s\S]*?)<\/section>/);
assert(agentEditor && agentEditor[1].split('<details')[0].includes('Agent name'), 'agent name stays on the default surface');

// The brief documents the three depth levels and rejects a Simple/Pro toggle.
for (const text of ['Level 0', 'Level 1', 'Level 2', 'Do not add a Simple/Pro']) {
  assert(brief.includes(text), `brief documents "${text}"`);
}

console.log('Progressive disclosure check passed.');
