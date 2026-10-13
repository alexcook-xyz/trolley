# Development workbench: UI design plan

Updated: 13 October 2026.

Status: proposed. The mockup uses sample data. It does not connect to accounts, start a VM, or change repositories.

Repository edition: the standalone preview resets all state on reload. Earlier notes about saved UI preferences describe the original in-chat design, not the standalone version. See [repository validation](validation.md) for current checks and the [README](../README.md) for launch instructions.

This revision follows the user's seven screenshot references. It replaces the earlier card-heavy mockup with a compact development workbench. Changed files occupy the upper right pane. The terminal stays below those files, to the right of every chat session.

No development backend has been built. The current work is a visual and interaction prototype.

## Purpose and design rules

Help a developer assign work, observe execution, inspect evidence, and accept changes.

The user owns the local project. A Linux VM runs the backend and development tools. Each task uses an isolated workspace. Remote execution is an optional future route.

Apple describes simplicity through concise language and a clear hierarchy. Our design uses spacing, contrast, and stable placement to make the next action clear. [Apple: Principles of great design](https://developer.apple.com/videos/play/wwdc2026/250/)

Apple recommends useful defaults and fewer settings. It separates occasional app preferences from options used in the current task. We apply that distinction to accounts, workspace configuration, and run controls. [Apple HIG: Settings](https://developer.apple.com/design/human-interface-guidelines/settings)

Meta recommends familiar interactions, purposeful contextual messages, and user agency in AI products. We use a familiar conversation and explicit controls for steering and reviewing agent work. [Meta: Designing AI products](https://www.meta.com/design-at-meta/blog/4-principles-for-designing-AI-products/)

Muse describes interruptible work, activity visibility, and notifications for meaningful results. We apply those patterns to development tasks. [Meta: How We Designed Muse](https://introducing-muse.com/)

These are design inputs. The layout below is our proposal. Usability tests must establish whether it works.

Every element must support a common action or explain a relevant state. Its label must explain its purpose. Give it one main place. Preserve user work when views change. Remove it if a simpler control serves the same purpose.

## Stable layout

Use three columns: narrow repository and task sidebar, a wide conversation, and a right development pane. Split the right pane vertically: changed files above, persistent terminal below.

| Area | Contents | Behavior |
|---|---|---|
| Left sidebar | Repositories, isolated workspaces, tasks, New workspace, Add repository, Settings | Group tasks under their repository. Use compact rows with branch, state, time, and change counts. Collapse this column first when space is limited. |
| Conversation header | Workspace, branch, compact runtime state | Confirm where work will run. Open workspace details from the label. |
| Conversation | Instructions, progress, decisions, results | Use a flat, wide text surface. Fold long logs and tool-call summaries. Preserve the reading position. |
| Composer | Context picker, agent, effective model, Send | Anchor it below the conversation. Keep task options near the task. Open the selected agent's profile from its control. Show Stop while a task runs. |
| Upper right | Changed files, file counts, additions and deletions | Keep the file list compact. Open the selected diff over the conversation column. Provide a clear route back to chat. |
| Lower right | Workspace execution and user shell | Remain visible to the right of chat, below the file list. Use resizable dividers. Preserve terminal sessions and scroll positions. |

Start with a sidebar near 220 pixels and a right pane near 34% of the remaining width. Give the terminal enough height for direct work. Test these values before fixing them.

Collapse the sidebar at narrow widths. Keep chat and terminal side by side. Establish a supported desktop minimum during testing. Below that width, retain the horizontal pair in a scrollable work area. Do not move the terminal below the chat.

The terminal header identifies its workspace and session. Show the current directory and runtime state. Provide New terminal, Find, and a small session menu. Users can resize the file and terminal split. They cannot replace the terminal with a preview while chat is visible. Clearing output does not stop a process. Ending a terminal and stopping a process are distinct actions.

Label agent task processes and user terminals separately. Background processes can appear in named terminal tabs. A manually entered command must not appear as agent work.

## Development detail

Result cards provide Review changes, Open preview, and View checks. Open detail only when needed.

Use the upper right file list as the stable entry point for code changes. Open files, diffs, previews, and checks over the conversation column when needed. The right file list and terminal remain visible. Provide Back to chat. Retain the draft and chat position.

An expanded detail view can use a separate window or dedicated route. If a chat is visible, its terminal stays on the right. A preview cannot replace the terminal in a chat session.

The diff shows its starting commit, current revision, changed files, and scope. Support unified and side-by-side review, line comments, selected staging, and conflict handling. Distinguish agent changes from other repository changes.

The host repository remains authoritative. Each task uses an isolated clone or worktree. Reviewed integration must check for new host edits and stop on conflicts. GitHub issues, draft pull requests, checks, and review status belong to the task's context.

Keep Apply locally, Commit, Push, Create draft PR, Merge, and Deploy as distinct actions. Show the affected branch and destination. Preserve a rollback checkpoint when applying local changes.

## Conversation and run controls

Use Discuss, Plan, and Build task modes. Explain each once in the menu. Discuss does not edit files. Plan prepares a plan. Build makes changes under the selected permissions.

The context picker accepts files, selections, issues, screenshots, and connected sources. Show included material as removable items. Avoid a permanent toolbar for every source.

Users can queue messages, steer running work, and stop where the provider supports those actions. Label unsupported actions. Keep unsent text per session.

Progress shows one current action. Expand for steps and logs. New output must not take focus or force the reader to the bottom. Offer New output when needed.

Results show changed files, test evidence, and unresolved issues. Use precise labels: `12 tests passed`, `Tests not run`, or `Build failed`. Place recovery actions beside the error.

## Settings menu

Place Settings in the sidebar footer and native app menu. Open a vertical category list and its form in the center column. Use one stable category list with search. Restore the last category.

Keep the active session and entire right pane alive while Settings opens. Settings replaces the conversation column. Closing it returns to the same draft and view.

| Category | Practical controls |
|---|---|
| General | System, light, or dark appearance; text size; notifications; keyboard reference; app updates |
| AI accounts | Connect accounts; inspect subscription or API route; app default model; supported capabilities; paid-route limits |
| Connections / MCP | Authenticated accounts; connector catalog; test and reconnect; custom local or remote MCP servers; access assignments |
| Agents | Tested templates and saved profiles; model inheritance or override; recommended skills; instructions; tool assignments |
| Runtime | Linux VM state; automatic start; CPU, memory, and disk limits; image version; storage; repair and diagnostics |
| Permissions and data | Default permission policy; selected host folders; tool access; task history retention; export and deletion |
| Advanced | Diagnostics, proxies, provider endpoints, environment image overrides, and developer logs |

Advanced stays closed until requested. Follow system accessibility preferences. Do not add redundant versions of system controls.

Runtime changes state whether they apply now, on the next run, or after restart. Save simple preferences immediately with brief confirmation. Use Save for forms with dependent account, runtime, or permission fields. Keep entered values when validation fails.

Deletion controls name the affected data. Routine mistakes use inline validation. Alerts are for actions with real consequences.

## Scope and inheritance

Every setting that can vary must show its scope.

| Scope | Examples | Entry point |
|---|---|---|
| App | Appearance, accounts, VM defaults, notifications | Settings |
| Workspace | Default model, branch, assigned tools, workspace limits | Workspace details |
| Agent | Model override, skills, instructions, permitted task actions | Agent profile |
| Run | Task mode, context, supported model choice | Composer and run details |

Show Use workspace default where inheritance applies. Also show the effective value and source. Example: `Codex model · inherited from workspace`.

Models can override defaults. Permissions remain within app and workspace limits. An agent profile cannot grant access that its workspace does not permit.

Agent and model changes apply to the next run. Keep earlier run records with their original settings. Changing providers does not transfer every provider-specific state.

## Agents and skills

The Agents section in Settings contains tested templates and saved profiles. Open the active agent's detail directly from the composer. Skills live inside the agent profile. Do not add separate Agents or Skills items to the main sidebar.

Create an agent by choosing a template, workspace, model, recommended skills, tool connections, and permissions. Test it before saving it as ready.

Templates include frontend developer, backend developer, test engineer, reviewer, documentation writer, and release assistant. Each explains its role.

A skill shows its purpose, source, version, compatibility, and enable control. Explain each recommendation in one sentence. Enabling a skill does not grant tool access.

A workspace can contain several agents. Each can inherit its model or select a supported model. Show provider, account, model, and reasoning setting before a run. Keep unsupported values out of selectable options.

## Connections and turnkey setup

The Connections / MCP section in Settings provides a searchable catalog and Add custom connection. Search by tool, category, provider, or MCP server. Label tested and custom connectors. Do not add a duplicate Connections item to the main sidebar.

Setup is: choose the service, authenticate, choose an account or project, inspect access, test, and assign. Prefer browser sign-in where supported. Secret entry uses a protected field.

Show Connected, Needs sign-in, Unavailable, or Test failed. Include the last test result. Provide Connect, Test, Reconnect, and Disconnect beside the selected connection.

Authentication belongs to the app account. Access assignments belong to a workspace or agent. Show both in one detail view. Skill changes cannot change access assignments.

Offer project setup bundles after the first task works. Let users choose each service. Label subscription use and paid API use. Require explicit approval before switching to a new paid route.

## Onboarding and useful states

Start with Open project or Clone from GitHub. Check the Linux runtime, connect one AI account, and select a tested starter agent. Then offer a small first task.

Install required Linux tools through this flow. Show progress and a useful recovery action if setup fails. Leave advanced configuration for later.

Before Linux starts, the right terminal shows Runtime not started and a setup action. Sample output must not appear as live execution.

Empty states offer one useful next action: Create agent, Connect a tool, or Start a task. An empty history does not need a dashboard.

| State | Meaning | Next action |
|---|---|---|
| Ready | A workspace can run | Enter a task |
| Starting runtime | Linux is preparing | Show progress and supported cancellation |
| Running | An agent is working | Show the current step, steer, or Stop |
| Needs input | A decision blocks work | Show the specific question or action |
| Ready to review | Work has evidence and proposed changes | Review changes |
| Failed | Work could not finish | Explain the reason and recovery |
| Stopped | The user stopped the run | Show preserved work and next steps |
| Disconnected | The UI cannot reach the backend | Reconnect and show the last confirmed state |

Disconnection does not mean a run stopped. Distinguish network, AI account, and Linux runtime failures. Each needs its own recovery path.

Use text with status color. Notify for needed input, completion, and failure. Keep normal progress in the session.

## Keyboard, accessibility, and visual style

Use Command on macOS and Control on Windows or Linux. Support the standard comma shortcut for Settings. Provide a command menu for less frequent actions.

Tab follows a stable visual order. Icons have labels. Dialogs return focus to their trigger. Escape closes menus and detail; it does not stop work.

Keep shell shortcuts inside the focused terminal. Do not intercept terminal control sequences. Provide app actions to focus chat and terminal.

Support screen readers, clear focus indicators, system reduced motion, adjustable text, and both themes. Announce meaningful states. Do not announce every streamed token or terminal line.

Use warm charcoal surfaces in dark mode and clean neutral surfaces in light mode. Use clear typography, fine separators, and restrained status colors. Keep the chat surface flat. Reserve borders and small rounded corners for controls, the composer, and forms. Use a system text font and a readable monospace font. Keep spacing consistent. Use depth to explain menus and dialogs. Avoid effects that reduce contrast.

The references show a quiet repository sidebar, compact task rows, a large conversation, a bottom composer, and changed files above a terminal. These are the visual patterns to preserve. Do not copy the source app's product name, personal details, or example repository contents.

Omit the source branding row, Home badge, pinned collaborator details, Teams/member list, video subtitles, presenter inset, and the ambiguous marked chat toolbar action. The red marks do not clearly exclude Home itself; we omit Home because the repository and task list already provide navigation. Keep Settings and Add repository in the sidebar footer.

Use short sentences and familiar technical terms. This is a relaxed controlled-language style. It does not claim formal ASD-STE100 compliance.

## Element-purpose inventory

| Element | Why it earns its place |
|---|---|
| Repository and task list | Returns the user to work without rebuilding context |
| New workspace | Starts an isolated task with clear context |
| Workspace and branch label | Prevents work in the wrong place |
| Runtime state | Explains whether execution is available |
| Agent and model selector | Shows the selected worker and account route |
| Context picker | Supplies exact task material |
| Send and Stop | Starts work and returns control |
| Changed file list | Shows the scope of proposed changes and opens review |
| Right terminal | Exposes execution and enables direct development work below the file list |
| Result actions | Opens evidence at the point of need |
| Agent profile in Settings | Configures repeatable roles, models, and skills; opens from the composer |
| Connections / MCP in Settings | Makes setup and access discoverable |
| Settings | Holds occasional preferences and maintenance controls |

Avoid decorative metrics, repeated status bars, panels for rare tools, and duplicate model selectors.

## Acceptance and validation

1. Every visible chat has changed files in the upper right and a terminal below them. The terminal remains right of chat. Resizing, review, preview, and Settings do not move or replace it.
2. Users can identify the workspace, branch, agent, model, account route, and runtime without opening Settings.
3. Settings works through the sidebar, app menu, and keyboard. Its vertical categories are General, AI accounts, Connections / MCP, Agents, Runtime, and Permissions and data. Advanced remains collapsed. Categories are stable and searchable.
4. Workspace and agent forms show scope, inherited values, and effective permissions.
5. An agent can be created through Settings with a model, skills, and assigned tools. The composer opens the selected agent's detail. Skills do not grant permissions.
6. A connection can be added, tested, restricted, reconnected, and removed through Connections / MCP in Settings. Local and remote MCP routes show their transport and scope.
7. The GitHub issue-to-task-to-diff-to-test-to-draft-PR flow preserves chat and terminal context.
8. Switching sessions or opening Settings preserves drafts, reading positions, history, and running processes.
9. Runtime, network, account, and task errors have distinct messages and recovery actions.
10. Profile changes apply to the next run. Paid API execution requires explicit authorization.
11. The flow works with the keyboard and screen reader in both themes.
12. Desktop layout tests establish a supported minimum width. Narrow layouts retain changed files above the terminal, to the right of chat. The sidebar collapses first.
13. Sample data, mock tests, and simulated authentication remain labeled.
14. The main sidebar has no source branding, Home badge, collaborator details, Teams area, duplicate Agents or Connections navigation, or video overlays. The marked toolbar control is absent.
15. Dark and light themes preserve the flat conversation, anchored composer, compact task list, thin dividers, and readable contrast shown in the references.

Test five tasks with developers: open a project, create an agent, connect a tool, fix a failing test, and prepare a draft pull request. Observe pauses, lost context, and scope confusion. Remove duplicate controls.

Repeat at laptop widths, with keyboard navigation, in both themes, and with a disconnected runtime.

## Prototype checks for this revision

The revised fragment passed JavaScript syntax checks and the bundled visualization validator. Browser checks confirmed these planning interactions:

- Changed files remain above the terminal. The terminal stays right of chat in Chat, Review, Settings, and agent configuration.
- Both dark and light appearances render. Settings uses the vertical category list at desktop widths.
- Opening Settings or Review preserves the chat draft. Switching workspaces preserves separate drafts and model defaults.
- Workspace inheritance and agent overrides resolve as shown. Editing a profile preserves its selected model and skills. Creating a profile retains a custom name when its template changes.
- The composer opens the active agent's settings. The custom MCP form checks example entries without contacting a service. Agent and user terminals show separate demo output.
- The layout fits a 1,024-pixel viewport. At 360 pixels, the sidebar collapses and the right-side arrangement remains intact without root overflow. This does not establish a usable desktop minimum.
- The red-marked branding, badges, collaborator detail, Teams area, toolbar control, and video overlays are absent. No browser errors were reported during the final checks.

These checks validate the prototype, not a working development backend. The final inline display is delivered through the app's task-folder lookup; browser checks cannot confirm rendering in the user's chat client.

No VM, terminal backend, AI account connection, Git operation, or GitHub request has been implemented by this mockup. Simulated interactions must stay clearly labeled.

The product still needs usability tests, keyboard and screen-reader review, real terminal integration, and backend validation. The desktop minimum width remains undecided.

## Git, review, and setup refinement

The latest references add chat tabs, one suggested Git action, plan approval, CI repair, Markdown preview, provider routes, and environment settings. [Conductor 0.22.0](https://www.conductor.build/changelog/0.22.0-code-review-and-historical-diffs) supplies the patterns for AI review and per-turn diffs. The design adapts these patterns to workspace and agent model selection.

| Control | Purpose and behavior |
|---|---|
| Chat tabs | Keep separate conversations, drafts, plan states, and agent assignments in one workspace. Ctrl/Command+T creates a chat. |
| Plan approval | Approve switches the selected chat to Build. Reject keeps it in Plan. Approval attaches to a specific plan revision. |
| Suggested Git action | Show the next useful action: Commit, Push, Create PR, View checks, Fix errors, Resolve conflicts, Merge, or Archive. |
| Check handoff | Show the failed job, commit, and relevant logs. Prepare a focused repair task for the selected agent. |
| Turn diff | Open the changes produced by one chat turn. Label historical snapshots read-only. |
| AI review | Select a reviewer model. Attach findings to an exact revision and path. Send a selected finding to an agent. |
| Markdown preview | Switch between source and rendered content within review. Historical source is read-only. |
| Open in | Offer VS Code, Cursor, Antigravity, Sublime Text, JetBrains, and the file manager when installed. |
| Full-height terminal | Hide the file list and expand the terminal inside the right column. Keep chat visible on the left. |
| Environment | Show scope: Workspace, Agent, or Application default. Mask values. Apply changes to the next run. |
| API route | Configure direct API, AI Gateway, Bedrock, Vertex, or a compatible custom endpoint separately from subscription accounts. |
| First workspace | Choose a local folder or GitHub source, select runtime and AI, then review the setup script. |

The setup assistant can draft a script. Show its commands before execution. Record the user's selected project, runtime, agent, and model as setup inputs. A failure offers its log and a focused repair action.

Chats in one workspace share files. Use a write lease for the same checkout, or an isolated child workspace for concurrent edits. Chat tabs alone do not provide file isolation. Record which chat produced each change.

Bind review, checks, and merge readiness to the exact commit or workspace snapshot. If files change, mark old evidence stale. Historical views must never apply an old diff to the current files through an unlabeled action.

Use a persistent terminal service for real execution. Preserve sessions when views change. Keep agent output separate from user shells. Archive should update the UI promptly while a recoverable snapshot finishes in the background. Performance, crash recovery, and long-running process behavior require backend tests; this preview does not establish them.

Notify on completion, a blocked task, a failed script, or an action that needs attention. Keep routine progress in the chat. Record the notification preference per workspace. Add `/clear`, `/compact`, all-files browsing, line highlighting, and conflict resolution to the implementation backlog.

## Feature-preview validation

The feature preview passed JavaScript syntax and visualization validation. Browser checks confirmed separate chat drafts and plan modes, plan approval and rejection, the demo Git/check repair sequence, setup-script drafting, provider preferences, masked environment rows, Markdown rendering, AI review, and disabled apply on historical diffs. New terminal tabs and full-height expansion work as local demonstrations. No browser errors were recorded.

The root fits 1,024-pixel and 360-pixel viewports without horizontal overflow. The narrow layout is a compact preview, not a promise that full desktop development is usable at that width.

Only UI preferences are saved by the preview. Conversation content and environment values remain in memory. No real VM, model, Git, GitHub, editor, or terminal action runs. Rendered images in the outputs folder provide a visible design even if the inline reader fails.
