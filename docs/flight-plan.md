# Trolley flight plan

## Goal

Do all 14 last-minute suggestions. Then make Trolley ready for Proof A and Proof B. Use three agent CLIs under one orchestrator. Save `muse-wonder-full-1.0` for the most adventurous work only.

## Success Criteria

- The current work has one clean commit and one tag.
- The stack, kill rules, budgets, data rule, and threat model are in writing.
- Ten eval tasks exist. Each task has one pass-or-fail test.
- The Protobuf contract and decision records exist.
- CI runs one smoke test on each OS.
- Each delegated run names its CLI, model, effort, and fallback before it starts.
- No full application code starts in this plan.

## Approach

I orchestrate. I assign each task, inspect each diff, and run each check myself. A worker report is not proof.

Local facts checked in this session: `muse`, `claude`, `agy`, and `codex` are on this machine. `agy models` lists `gemini-3.8-flash-high`, `gemini-3.8-flash-medium`, `gemini-3.8-flash-low`, `claude-sonnet-4-6`, `claude-opus-4-6-thinking`, and `gpt-oss-120b-medium`. `muse model-profile show muse-wonder-full-1.0` resolves, with a default reasoning effort of high.

## Model and effort assignment

| Task type | Worker | Effort rule |
|---|---|---|
| Plan, assign, merge, verify | This Muse session | Default effort. I keep control of scope and proof. |
| Routine code, docs, checks, small fixes | AGY, `gemini-3.8-flash-medium` | Use `gemini-3.8-flash-low` for search or rename only. Use `gemini-3.8-flash-high` for a refactor or a hard debug. |
| Code review, security review, protocol review | Claude Code CLI, `sonnet` | Use `opus` at high effort for security or contract work. |
| New architecture, tournament design, unsolved proof, final frontier review | Muse, `muse-wonder-full-1.0` | Use max effort. Use ultra effort only if max effort fails and the task still matters. Set a step cap for each run. |
| Second opinion on a blocked task | Codex CLI | Use only after one worker fails on the same task. Name the reason in the log. |

Do not use `muse-wonder-full-1.0` for routine code, docs, formatting, or checks. Do not start a wonder-full run without a clear pass rule.

## Fallback plan for usage limits

1. Record the CLI, model, effort, start state, and error for each run.
2. Do not retry the same call at once. Classify the error first: quota, rate limit, auth, or task failure.
3. For a quota or rate limit, move down one rung: AGY high to medium to low, then Claude `sonnet`, then the Muse default model.
4. For Claude, move from `opus` to `sonnet`. Keep the same prompt and the same pass rule.
5. If `muse-wonder-full-1.0` runs out, pause the adventurous task. Mark it `frontier-blocked`. Do not spend a paid API route without user approval. Resume the task when quota returns or when the user approves a new route.
6. Never switch a subscription route to a paid API route in silence.
7. Save a checkpoint before each dispatch: git status, prompt, model, and base commit. Any worker can take over from that checkpoint.

Use one writer for each file area. Use separate worktrees for parallel writers. Stop on a merge conflict and let the orchestrator resolve it.

## Steps

**Unit 0: Set orchestration**

1. Write `docs/orchestration.md` with the table and fallback rules above.
2. Add a run log format: task, CLI, model, effort, base commit, result, fallback used.
3. Run the preflight checks: `agy models`, `claude --help`, `muse model-profile show muse-wonder-full-1.0`.

**Unit 1: Lock the base**

1. Run `npm run check` in trolley.
2. Stage the named changed files only. Do not use a broad add.
3. Make one commit for the font, disclosure, frontier, stack, and diagram work.
4. Add the tag `prototype-v0.1`.
5. Add `docs/tech-stack.md` to the README docs list.

**Unit 2: Write the rules**

1. Add pass, fail, and time-limit rules for Proof A and Proof B to the stack doc.
2. Add the image size budget: 500 MB compressed.
3. Add the weak-laptop budget: 8 GB RAM and 4 cores.
4. Add the data rule: no code or chat leaves the computer by default.
5. Write a one-page threat model in `docs/threat-model.md`.
6. Check provider terms for Codex, Claude, and Antigravity from the links in `docs/product-brief.md`. Record one source link and one verdict for each provider. Mark an open verdict if a source does not give a clear answer.

**Unit 3: Seed proof assets**

1. Add ten eval task files under `evals/`. Use TOML. Each file names the task, the test command, and the pass rule.
2. Add `proto/trolley.proto` with task, run, event, score, and cancel messages. Freeze version 1 in the file header.
3. Add decision records under `docs/decisions/` for the shell, the runtime, the protocol, the state store, and score-first.
4. Mark the prototype as frozen in the README. State that new app code does not go in `index.html`.

Assign Unit 3, Step 2 to Claude `opus` for review after a first draft. Assign the eval task drafts to AGY flash-medium. Keep wonder-full out of this unit.

**Unit 4: Add CI smoke checks**

1. Add a GitHub Actions file with Windows, macOS, and Ubuntu jobs.
2. Run `npm run check` in each job now. Add the VM smoke test to each job when Proof B exists.
3. Show the final git status, the new commit, and the tag.

## Validation Plan

- Run `npm run check` after Units 1, 3, and 4. Expect all checks to pass.
- Run `git status` after the commit. Expect a clean tree, except for files named in later units.
- Read each eval task file. Confirm that each test can pass or fail with no opinion score.
- Read the threat model. Confirm it covers secrets, host files, untrusted code, and MCP tools.
- For each delegated run, inspect the diff and run the check myself. Do not accept a worker claim alone.
- Highest-risk step: Unit 2, Step 6. If provider terms block a subscription route, the plan for that provider stops there.

## Risks / Open Questions

- **Risk:** A provider may not permit a third-party subscription client. Mitigation: one adapter per provider, and no dependence on one provider.
- **Risk:** The 500 MB image limit may fail on the first build. Mitigation: remove tools from the image before you raise the limit.
- **Risk:** Two writers may edit one file. Mitigation: one writer for each area, and separate worktrees for parallel work.
- **Open question:** None for this plan. Mac runtime proof stays in Proof B, after this plan.
