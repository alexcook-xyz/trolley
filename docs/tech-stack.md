# Trolley tech stack

Status: decided for the first build. Pin exact patch versions in lock files on day one. Do not change a layer without a written reason and a test.

## Decision

Do not start the full build yet. Run two short proofs first. Start the full build only if both proofs pass.

| Proof | Pass rule | Fail rule | Time limit |
|---|---|---|---|
| A: Provider proof | Sign in with a Codex subscription in the browser. Run one task in the VM. Get one diff and one test result. | Sign-in needs a manual token paste, or the task runs only with an API key. | 2 working days |
| B: Runtime proof | Boot the same image under WSL2 on Windows. Run one sandbox task. Run the same task under libkrun when a Mac is available. | The user must install or fix a tool by hand, or the two adapters need different images. | 3 working days |

If a proof hits its time limit, stop. Record the blocker in the proof file. Do not start full application code.

If proof A fails, the product has no core value. If proof B fails, the product has no turnkey start. Fix the failed proof before any other work.

## Budgets

- Runtime image: maximum 500 MB compressed. If a tool breaks the limit, remove the tool. Do not raise the limit without a decision record.
- Weak laptop test: 8 GB RAM, 4 CPU cores. The VM must stay usable at that level. Suspend the VM when no task runs.
- First run: less than 5 minutes from install to the first task prompt. Measure it on the weak laptop test machine.

## Data rule

No code, chat, prompt, or secret leaves the computer by default. Send data only with clear, task-level consent. Show what will be sent before you send it. Keep secrets out of logs, exports, and training data.

## Exact stack

| Layer | Choice | Notes |
|---|---|---|
| Desktop shell | Tauri 2 | Rust shell. System webview. No Electron. |
| Host bridge | Rust, Tokio | VM life cycle, folder access, keychain, updates, editor launch. |
| Interface | React 19, TypeScript strict, Vite | Keep the current design tokens in plain CSS. Use Lucide icons. Use Zustand for local UI state only. |
| Package manager | pnpm | Lock file required. |
| Host to VM protocol | gRPC with tonic, Protocol Buffers | Use vsock where the adapter supports it. Use loopback TCP as the fallback. One event stream for task progress. |
| VM backend | `trolley-agentd`, Rust, Tokio | One trusted process in the VM. It owns tasks, Git, policies, and state. |
| State store | SQLite on the host | Event log for tasks, runs, scores, and settings scope. Git stays the source of truth for code. |
| Secrets | `keyring` crate | Windows Credential Manager, macOS Keychain, Linux Secret Service. No secrets in the VM sandbox. |
| Runtime image | Debian slim OCI image | Build with BuildKit. Sign with cosign. Ship an SBOM from Syft. Update by layers. |
| Inside the image | Podman rootless, bubblewrap, Git, Node.js LTS, Python, ripgrep | One task gets one sandbox, one worktree, and one copy-on-write overlay. |
| Windows runtime | WSL2 custom distro | Import the same OCI image as a WSL2 distro. |
| macOS runtime | libkrun through krunkit | Same image, native hypervisor. |
| Linux runtime | libkrun with KVM, or native sandbox | Use native mode only when the host already meets the image rules. |
| First provider | Codex app-server | Browser sign-in. Discover models. Do not hard-code model access. |
| Second provider | Claude Agent SDK | Add only after the Codex task loop passes. |
| Third provider | Antigravity SDK, Gemini CLI | Add only with a tested auth route for each one. |
| Eval harness | `trolley-eval`, Rust | One TOML file for each eval task. One test command for each task. One JSON score record for each run. |
| Tests | cargo test, Vitest, Playwright | Add one VM smoke test for each host OS in CI. |
| CI and release | GitHub Actions on Windows, macOS, and Ubuntu | Signed installers from Tauri: NSIS, DMG, AppImage. Signed auto-update. |
| Logs | `tracing` crate, local files | No telemetry by default. Send data only with clear consent. |

## Rules

1. One runtime image serves all users. The adapter changes per OS. The image does not.
2. One shared VM serves the computer. Do not boot one VM for each agent.
3. Firecracker is not the base. Use it only as an optional Linux high-isolation mode.
4. Score first. The eval harness ships before agent tournaments.
5. Keep the frontend thin. Put task logic in `trolley-agentd`, not in React.

## Build order after the proofs

1. Scaffold Tauri, React, and the Rust workspace. Add lock files and CI.
2. Build the WSL2 adapter and the first image. Add the libkrun adapter next.
3. Build the Codex adapter and the task loop to a draft pull request.
4. Add the eval harness, snapshots, and tournaments.
5. Add Claude and Antigravity adapters.
