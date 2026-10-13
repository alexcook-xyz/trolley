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

- Layer 1 core image: maximum 500 MB compressed. If a core tool breaks the limit, remove the tool. Do not raise the limit without a decision record.
- Layer 1 plus Layer 2: maximum 1.5 GB compressed. Download Layer 2 in the background during sign-in. Do not block the first task on Layer 2.
- Layer 3 bundles have no fixed limit. Show the download size before you install a bundle.
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
| Inside the image | See the preload layers below | One task gets one sandbox, one private clone, and one copy-on-write overlay. |
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

## Preload layers

Preload the tools that most developers use. Do not preload every tool in one image. Use three layers.

### Layer 1: Core, always installed

| Group | Preinstall |
|---|---|
| Shell and search | bash, zsh, Git, GitHub CLI, ripgrep, fd, jq, yq, fzf, curl, unzip |
| Editors and view | Neovim, Nano, bat, tree, less |
| Build base | build-essential, pkg-config, cmake, Python 3, pip, uv |
| Runtime manager | mise, Node.js LTS, Bun, pnpm, npm, Yarn |
| More runtimes | Go, Rust with rustup, Deno, OpenJDK |
| Containers | Podman, bubblewrap, Docker CLI, Docker Compose |
| Quality | ShellCheck, shfmt, Ruff, Prettier, ESLint |
| Browser test | Playwright with Chromium |
| Repo speed | Watchman, Sapling, Buck2 |

Sapling, Watchman, and Buck2 are Meta public tools. Meta internal tools for Muse are not public. Do not promise those tools. These public tools serve the same jobs.

### Layer 2: Agent and startup tools, always installed

Download this layer in the background during sign-in. Do not block the first task on it.

| Group | Preinstall |
|---|---|
| Coding agents | Codex CLI, Claude Code CLI, Gemini CLI, Antigravity CLI |
| Agent help | Aider, OpenCode, Goose, Continue CLI |
| MCP | MCP Inspector, Filesystem MCP, Git MCP, Playwright MCP |
| Web deploy | Vercel CLI, Netlify CLI, Fly.io CLI, Railway CLI, Wrangler |
| Data and backend | Supabase CLI, Neon CLI, Prisma, Drizzle Kit, PostgreSQL client, Redis client, SQLite |
| Cloud | AWS CLI, Google Cloud CLI, Azure CLI |
| Ship and check | Sentry CLI, PostHog CLI, Stripe CLI |

Install each agent CLI in the image. Store no token in the image. On first run, Trolley opens the system browser for sign-in. It saves each token in the host keychain. It gives the VM only the access that one run needs.

Check each CLI license before you bundle it. If a license blocks bundling, download that CLI on first use. Show one clear install step. Do not hide the download.

### Layer 3: Bundles, installed on first need

| Bundle | Tools |
|---|---|
| Mobile | Flutter, Android SDK, CocoaPods tools where the OS permits them |
| Data and ML | CUDA tools where hardware permits them, Ollama, Hugging Face CLI, PyTorch stack |
| Java and enterprise | Maven, Gradle, .NET SDK |
| Design and docs | Pandoc, FFmpeg, ImageMagick, Figma tools where a public CLI exists |

Trolley detects the project and suggests the bundle. Show the download size first. Install the bundle as a cached layer. Show one progress bar, not a terminal task.

## Image update system

Push updates to the app and to the VM image on one release train.

1. A weekly build job checks each preloaded tool for a new version.
2. The job builds a new image and runs the eval set and the smoke tests on it.
3. Sign the image with cosign. Ship an SBOM from Syft with the image.
4. The app downloads only changed layers in the background.
5. The new image starts at the next VM start. Keep the last good image for rollback.
6. Agent CLIs do not self-update inside the VM. The image is the update. Each user stays on a tested set.
7. Use two channels: Stable for most users, Beta for users who want new tools first.
8. If a new image fails a smoke test, stop the rollout. Keep users on the last good image.
9. Update the desktop app with the signed Tauri updater on the same release note. The user sees one update, not two.

Record each image version, tool versions, and test result in the run manifest.

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
