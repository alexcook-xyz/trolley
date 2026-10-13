# Orchestration

The orchestrator is this Muse session. The orchestrator plans, assigns, merges, and verifies. A worker report is not proof.

## Assignment

| Task type | Worker | Effort rule |
|---|---|---|
| Plan, assign, merge, verify | Orchestrator session | Default effort. Keep control of scope and proof. |
| Routine code, docs, checks, small fixes | AGY `gemini-3.8-flash-medium` | Use `gemini-3.8-flash-low` for search or rename. Use `gemini-3.8-flash-high` for a refactor or a hard debug. |
| Code, security, or protocol review | Claude Code CLI `sonnet` | Use `opus` at high effort for security or contract work. |
| New architecture, tournament design, unsolved proof, final frontier review | Muse `muse-wonder-full-1.0` | Use max effort. Use ultra effort only if max effort fails and the task still matters. Set a step cap for each run. |
| Second opinion on a blocked task | Codex CLI | Use only after one worker fails on the same task. Name the reason in the log. |

Do not use `muse-wonder-full-1.0` for routine code, docs, formatting, or checks. Do not start a wonder-full run without a clear pass rule.

## Fallback for usage limits

1. Record the CLI, model, effort, start state, and error for each run.
2. Do not retry the same call at once. Classify the error first: quota, rate limit, auth, permission, or task failure.
3. For a quota or rate limit, move down one rung: AGY high to medium to low, then Claude `sonnet`, then the Muse default model.
4. For Claude, move from `opus` to `sonnet`. Keep the same prompt and the same pass rule.
5. If `muse-wonder-full-1.0` runs out, pause the task. Mark it `frontier-blocked`. Never switch a subscription route to a paid API route without user approval. Resume when quota returns or the user approves a route.
6. For a permission block, do not add a skip-permissions flag without user approval. The orchestrator does the task or splits it into a read-only task.

## Checkpoint and writers

Save a checkpoint before each dispatch: git status, prompt, model, and base commit. Any worker can take over from that checkpoint.

Use one writer for each file area. Use separate worktrees for parallel writers. Stop on a merge conflict. The orchestrator resolves the conflict.

## Run log format

| Field | Value |
|---|---|
| Task | Short task name |
| CLI | `agy`, `claude`, `muse`, or `codex` |
| Model | Exact model slug or alias |
| Effort | Exact effort level |
| Base commit | Commit hash at dispatch |
| Result | Pass, fail, or blocked, with the check that proves it |
| Fallback used | None, or the next rung used |

## Run log

| Task | CLI | Model | Effort | Base commit | Result | Fallback used |
|---|---|---|---|---|---|---|
| Write this doc | AGY | `gemini-3.8-flash-medium` | medium (model slug) | 485f9f6 | Blocked: write permission denied | Orchestrator wrote the doc |
| Review threat model | Claude Code CLI | `sonnet` | medium | b5e1ecf | Pass: 4 high findings, all fixed in the threat model | None |
| Review proto contract | Claude Code CLI | `opus` | high | 8371669 | Pass: 6 gaps found; resume point, input reply, failure reason, and tests-ran flag added | None |
| Provider terms, Codex and Claude | Claude Code CLI | `opus` | high | 229704a | Blocked: no web access in the worker session | Orchestrator checked the official sources |
| Provider terms, Antigravity and Gemini | AGY | `gemini-3.8-flash-high` | high (model slug) | 229704a | Blocked: read URL permission denied | Orchestrator checked the official sources |
| Proof A task | Codex CLI | `gpt-6.1-sol` | medium | d11a039 (scratch repo) | Blocked: ChatGPT usage limit, retry at 6:12 PM | Claude ran the same task |
| Proof A fallback task | Claude Code CLI | `sonnet` | medium | d11a039 (scratch repo) | Pass: one-line diff; orchestrator saw `PASS session test` | None. It was the fallback. |
| Scaffold layout research | AGY | `gemini-3.8-flash-medium` | medium (model slug) | c29b982 | Pass: layout and ping contract used in the scaffold | None |
| Toolchain risk review | Claude Code CLI | `sonnet` | medium | c29b982 | Pass: MSVC gap and icon rule named before the build | None |

## Verification

The orchestrator inspects each diff. The orchestrator runs each check. Confirm that changes stay in the requested scope.
