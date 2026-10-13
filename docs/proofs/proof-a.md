# Proof A record

Date: 2026-10-13. Host: this Windows machine. This proof ran on the host, not in the VM. The VM part belongs to Proof B.

## Result

Partial pass. The terms pass. The fallback task passes. The Codex task run is blocked by quota.

| Check | Result |
|---|---|
| Provider terms | Pass for Codex and Claude. See `docs/provider-terms.md`. Antigravity stays open. |
| Codex sign-in | Pass. `codex login status` reports: Logged in using ChatGPT. Codex CLI version: 0.162.0. |
| Codex task run | Blocked. Codex model `gpt-6.1-sol` returned a usage limit error. It named 6:12 PM as the retry time. |
| Fallback task run | Pass. Claude `sonnet` at medium effort fixed the scratch task. The orchestrator ran the test: `PASS session test`. |
| Diff check | Pass. One line changed in `session.mjs` in the scratch repo. The test file did not change. |

## Scratch task

The task seed lives outside this repo, under the system temp folder in `trolley-proof-a`. The fix adds `await waitForCookie();` before the user read. The seed test failed before the fix and passed after the fix.

## Rule for the next run

Do not retry Codex at once. Wait for the quota reset time from the error. Then run the same prompt, model, and pass rule. If Codex passes, change this record to a full pass for the host part.

## Next step

Start Proof B. WSL2 is present on this machine with default version 2. Boot a Debian image under WSL2 and run one sandbox task. Keep the Codex re-run as a separate quota-blocked item.
