# Threat model

Scope: the first build. One user, one computer, one shared runtime VM.

## Assets to protect

| Asset | Harm if lost |
|---|---|
| Subscription tokens and API keys | Another party can spend or act as the user |
| Host project files | Code loss or silent change |
| Private code and prompts | Private work leaves the computer |
| Host operating system | Damage outside the project folder |

## Threats and controls

| Threat | Control |
|---|---|
| Secrets: a task reads a token and prints it | Keep tokens in the OS keychain on the host. The host bridge brokers model calls, or injects one short-lived scoped token for one run. Never give a long-lived token to the sandbox. Redaction is a backup only, not a control. |
| Host files: an agent writes outside the project | Give each task a private clone in the VM, not a worktree that shares the host `.git`. Mount no host folder in the sandbox. Show the granted folders in the interface. Confirm that the VM cannot see host drives, such as `C:\` under WSL2. |
| Host-side run of agent output: apply or merge runs Git on the host | Treat the task tree as hostile. Strip hooks, filters, and config before a host Git action. Reject symlinks and paths that escape the tree. |
| Untrusted code: project code runs a bad command | Run code only in the sandbox. Set CPU, memory, disk, process-count, and time limits. Allow network only to the provider route and to task grants. Block access to the host, the local network, and local services. |
| Prompt injection: repo files or tool output steer the agent | Show each external grant before use. Keep the permission rules in the trusted layer. A prompt cannot grant access. |
| Shared VM: one task harms another task | Reset each task sandbox from a clean snapshot. Give each task its own disk overlay, process space, and cache. |
| MCP tools: a tool asks for more access | Assign access per workspace and per agent. Test a connection before use. Show new permission requests before you grant them. |
| Provider route: a run moves to a paid API in silence | Keep subscription and API routes separate. Ask for clear approval before a paid route runs. |
| Data loss: apply or merge writes bad code | Save a rollback point before apply, merge, or deploy. Keep staged, unstaged, and untracked work separate. |
| Log leak: logs hold secrets or private code | Keep logs local by default. Redact secrets. Send no log without task-level consent. |

## Rules

1. The trusted layer enforces each rule. The trusted layer is the Rust host bridge on the host and `trolley-agentd` in the VM, outside each task sandbox. The model does not enforce rules.
2. A skill can guide an agent. A skill cannot grant access.
3. The sandbox gets the least access that lets the task run.
4. Each grant shows its scope: app, workspace, agent, or one run.
5. If a control cannot be tested, mark the feature not ready. Do not ship it as ready.
