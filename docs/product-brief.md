# Local development workbench: product brief

Status: proposed requirements and architecture. The repository contains an interactive UI prototype. The development backend has not been implemented.

Updated: October 13, 2026.

**Product goal**

Build a desktop application for software development. Run the development backend in a local Linux VM. Keep the user's main project files on their computer. Add optional remote execution later.

The application should work on supported Windows, macOS, and Linux systems. The interface and backend protocol should stay consistent across systems. Each system still needs a suitable VM adapter. Supported operating system versions and CPU architectures must be stated explicitly.

Use short sentences, active voice, and consistent terms in product documentation. Use ASD-STE100 as a writing guide. Keep necessary software terms. Do not claim full standard compliance without a rule and dictionary check.

**Interface direction**

Use a modern chat interface as the main work surface. Combine project and task navigation, conversational development, code review, application previews, and visible execution status.

The reference set is Codex, Claude, Antigravity, Grok, and Meta AI, which is an application surface for Muse Spark. Also consider Muse's documented approach to steering tasks and meaningful notifications. The comparison uses observed public layouts and official product references. It does not claim direct testing of every signed-in interface.

Use a collapsible left sidebar for projects and task workspaces. Group tasks under their project. Show their current status in text. Put Agents and Connections in Settings. Place skill assignments inside the agent setup flow. Keep the skill library accessible from those controls.

Keep the project, task workspace, branch, and local or remote execution target visible. Show the effective agent and model near the composer. Distinguish the model used for a recorded result from the model selected for the next run.

Use a readable conversation column with a persistent composer. Add a context picker for files, code selections, issues, screenshots, and connected sources. Fold verbose activity logs. Preserve draft messages and scroll position when the user switches tasks.

Use a stable three-column layout: project navigation, chat, and terminal. The terminal remains on the right of every chat session. Collapse project navigation first when space is limited. Preserve the horizontal chat and terminal arrangement. Validate a minimum desktop width instead of moving the terminal below chat.

Show Changes, Files, Preview, Checks, and agent settings in a chat-side detail view. Provide a clear return action. Keep the right terminal visible. Preserve drafts, scroll position, terminal sessions, and running processes while switching views.

Label the terminal with its task workspace, working directory, and selected shell. Keep agent execution and the user's shell separate. Make command errors and running processes inspectable without adding routine progress banners to chat.

Provide an application menu and a Settings entry. Group settings into General, AI accounts, Runtime, Connections, and Permissions and data. Put infrequent troubleshooting controls in a collapsed Advanced section. Keep frequent task choices near the task.

Use good defaults. Follow system appearance unless the user chooses otherwise. Show configuration scope and inheritance. Apply runtime resource changes at the next VM start. Preserve each run's recorded configuration.

Keep local apply, commit, push, draft pull request, merge, and deployment as separate actions. Show the revision and test evidence for the candidate under review.

Use restrained neutral colors, readable text, fine borders, and clear focus indicators. Support light and dark themes, adjustable text size, keyboard use, and reduced motion. Keep notifications quiet during normal progress. Notify when a task completes, fails, or requires a decision.

The companion UI design brief and interactive HTML plan describe the reference patterns, settings, workflows, and acceptance criteria. The interface concept uses sample data. It does not run a VM, contact models, connect tools, or change repository files.

**Turnkey setup**

The user should complete the supported setup through the GUI.

1. Install the desktop application.
2. Check hardware virtualization and available resources.
3. Install or provision the supported Linux runtime.
4. Connect an AI account.
5. Open or clone a repository.
6. Connect the tools needed for the project.
7. Run a task and review its changes.

The application should manage its required tools inside Linux. Users should not need to install Node.js, Python, Git, or MCP packages on the host for supported workflows. Explain any required operating system feature, administrator action, or restart in the GUI.

Provide runtime status, resource controls, signed updates, update recovery, and a repair action. Record the runtime image and tool versions for each task.

**System boundaries**

| Component | Responsibility |
|---|---|
| Desktop interface | Chat, editor, changes, terminal, previews, connections, and task status |
| Small host bridge | Selected folder access, file watching, VM lifecycle, and secure operating system integration |
| Trusted Linux backend | Task orchestration, Git operations, connection management, state, and policy enforcement |
| Task sandbox | Agent-generated code, project commands, builds, tests, and private task files |
| Optional remote adapter | The same task operations against a remote execution service |

Generated code must be isolated from the trusted backend. It must not have broad access to host files or long-lived account credentials. A worktree separates changes but is not a security boundary.

Persist task events and progress. Distinguish a client disconnect from a stopped process. Recovery must not repeat completed external writes without checking their result.

**AI accounts**

Start with Codex app-server. Add Claude and Antigravity through documented integration methods. Test account eligibility, authentication, cancellation, streaming, approvals, and recovery separately for each provider.

Show the account and billing route used for each task. An account connection does not establish permission for every API or model. Never silently change from subscription use to separately billed API use.

Add Vercel AI SDK and AI Gateway as an optional API execution route. Keep provider capabilities visible. Do not promise identical features across agents.

**Workspace model settings**

Each isolated workspace has its own default AI configuration. It includes the provider, account reference, agent runtime, model ID, supported reasoning setting, and execution target.

The agent runtime is the software that runs the agent and its tools. The model performs the reasoning. These are separate choices. Show only combinations that the runtime supports. Show account eligibility as verified, unknown, or unavailable. A model catalog alone does not prove account access.

Each agent instance can use the workspace default or select another supported model and account. Use this order when resolving the model:

1. An explicit setting on the agent instance.
2. The workspace default.
3. The application default.

Template recommendations should be visible suggestions. They must not silently replace the user's selection. Display the resolved model and account before starting a task.

Keep provider configuration scoped to the workspace or agent instance. Changing one workspace must not rewrite another workspace's model, account, or skill settings. Use isolated provider configuration directories where a runtime needs them.

Discover model options through the provider adapter. Use the provider's exact IDs and supported settings. Do not hard-code an assumption that every subscription supports every model.

If the chosen model becomes unavailable or an account limit is reached, pause the task or use a fallback policy the user has already approved. Explain any additional charge before changing to paid API execution. Keep accelerated model modes disabled.

Freeze the resolved configuration for each run. Profile edits affect new runs. Changing an active run requires an explicit checkpoint and switch action. When changing providers or incompatible runtimes, start a new session from recorded project state and a visible handoff summary. Do not claim that hidden provider state transfers.

**Turnkey agent templates**

Provide an Agents screen with templates, custom profiles, and workspace assignments. An agent profile combines a role, instructions, a model configuration, enabled skills, connection references, and permitted actions.

The user should create an agent through the GUI:

1. Select a role template.
2. Name the agent.
3. Select a workspace.
4. Keep its default model or choose a supported model.
5. Review and enable recommended skills.
6. Connect any required tools.
7. Review the permitted actions and run limits.
8. Run a setup test and save the profile.

Offer these initial templates. The skill names below describe proposed categories. Specific packages must be selected and tested.

| Agent template | Recommended skill categories |
|---|---|
| Frontend developer | TypeScript, React, accessibility, interface testing |
| Backend developer | API design, database changes, validation, integration testing |
| Test engineer | Test planning, test generation, browser testing, failure diagnosis |
| Code reviewer | Diff review, regression analysis, maintainability |
| Documentation writer | Technical explanation, API documentation, examples |
| Release assistant | GitHub checks, release notes, deployment preparation |

Allow the user to create a custom role or duplicate a template. Support different models for different agents in the same workspace. A frontend agent and a test agent can have distinct models, skills, and connector grants.

Recommendations should consider the repository's languages and frameworks, the role, the task, available connections, and tested runtime compatibility. Show a short reason for each recommendation. Prefer a small relevant skill set. Model recommendations should be based on measured task results and compatible capabilities.

Use separate writable task workspaces for concurrent coding agents. Keep each task's base commit and changes identifiable. Use reviewed integration to combine results. A read-only review agent can inspect a recorded candidate without owning its write access.

**Skill library and assignments**

Provide a Skills screen with search, descriptions, publishers, versions, compatibility, dependencies, and enable controls. Use the Agent Skills format for portable packages where supported. Adapt package loading for each agent runtime.

A skill contains instructions and may contain reference files, templates, or scripts. Skills guide the agent during a task. They do not change the underlying model weights.

Keep installed, assigned, and active states separate:

- Installed: the skill package is available locally.
- Assigned: the skill is enabled for a particular agent profile.
- Active: the skill is loaded for the current task.

An installed skill should not become available to every agent automatically. An assigned skill should load when relevant or when explicitly selected. Keep always-needed role instructions in the profile. Avoid loading the full library into every task.

Show missing tool dependencies and offer their supported setup flow. A template can recommend a connector but cannot grant its permissions. Skill instructions and package metadata cannot bypass the trusted permission service.

Allow custom skill creation, import, editing, and export through the GUI. Record package source, license, version or content hash, and dependencies. Review scripts and new access requirements before enabling them. Installing a package must not automatically execute its scripts.

Pin skill versions for saved profiles. Show updates and permit rollback. Record the exact skill versions used in each run. Export profiles and skills without credentials, personal authorization grants, or account secrets.

Record a run manifest containing the resolved provider and model, account reference, role instructions version, skill versions, tool grants, runtime image, and starting Git state. Use this record for recovery, comparisons, and task evaluations.

**Local files and Git**

The selected local repository remains the main project. The trusted Git service manages its changes through narrow folder access.

Each agent task starts from a recorded commit and a private Linux task clone. Include selected uncommitted files only when the task setup calls for them. Preserve staged, unstaged, and untracked work separately.

The agent edits and tests its task copy. It returns a patch or commits for review. Before integration, compare the local repository with the recorded starting state. Resolve conflicts before applying changes. Preserve a recovery checkpoint.

Offer repository initialization, cloning, status, file and line staging, commits, branches, history, fetch, pull, push, merges, and conflict resolution. Advanced Git workflows can follow the first complete workflow.

Support GitHub issues, draft pull requests, review feedback, and automated check results. Prepare external writes for review. Perform them only within the user's authorized scope. Production merges, deployment, public releases, spending, and destructive actions require explicit approval.

**Connection catalog**

Provide a Connections screen with search, categories, account selection, setup requirements, and clear status.

The catalog has three coverage levels:

- Tested: a connector with passing compatibility tests for a stated release and runtime.
- Community: a published connector whose compatibility and maintenance are clearly described.
- Custom: a connection the user adds through a GUI form or configuration import.

Publisher identity, compatibility testing, and security review are distinct facts. Show them separately.

The first catalog should target these categories. The examples below are candidates, not verified integrations.

| Category | Candidate tools |
|---|---|
| Source control | GitHub, GitLab, Bitbucket |
| Deployment and hosting | Vercel, Cloudflare, Netlify, Railway, Render, Fly.io |
| Databases and storage | Postgres, Neon, Turso, MongoDB, Redis, database platform connectors |
| Issues and planning | Linear, Jira |
| Errors and analytics | Sentry, PostHog, observability platform connectors |
| Design and documentation | Figma, Notion, documentation search |
| Communication | Slack, Microsoft Teams, Discord |
| Testing and browser tools | Playwright and supported browser automation connectors |
| Authentication and payments | Authentication platform and payment provider connectors |
| AI development | AI Gateway and supported model, tracing, and evaluation services |

Use maintained API or CLI adapters where they provide a reliable workflow. Use MCP where it fits the provider. A service does not need an MCP server to receive a GUI connector.

**Connection setup flow**

1. Select a tool.
2. Show its publisher, capabilities, and setup requirements.
3. Choose the account and connection method.
4. Complete browser sign-in or enter a credential in a protected field.
5. Select the organization, workspace, repository, or project.
6. Review the requested permissions.
7. Run a non-destructive connection test.
8. Enable the connection for selected projects and agents.

Some providers require app registration, an account plan, administrator consent, or a hosted credential service. Show those requirements before setup begins. Never distribute a shared confidential client secret inside the desktop application.

Useful connection states include Connected, Needs sign-in, Missing permission, Service unavailable, and Unsupported version. Each failure should offer a specific repair action.

Offer project setup bundles. A bundle combines compatible runtime tools, connection suggestions, and project settings. For example, a web application bundle could suggest GitHub, Vercel, a database provider, and an error reporting service. The user selects which services to connect.

Detect project manifests to recommend useful bundles. Show provider plans and resource costs before provisioning. Provision paid resources only after explicit approval. Export reusable bundle settings without credentials or personal authorization grants.

**MCP support**

Support local stdio servers and remote Streamable HTTP servers. Support documented older protocol revisions where common servers require them. Maintain a tested compatibility matrix.

For remote connections, provide a URL field, authentication setup, capability discovery, and a connection test. For local connections, provide package or command fields, arguments, protected credential fields, runtime selection, and a test.

Run Linux-compatible local servers inside an isolated connector environment. A tool that requires host hardware or a host application needs an explicit host adapter. Installing it inside Linux does not grant host access.

Manage server startup, shutdown, health, timeouts, cancellation, credential renewal, and updates. Pin local package or image versions. Surface tool and permission changes before granting new access.

Support resources and prompts where the selected agent can use them. Treat MCP Apps and other optional extensions as later capabilities. Enable them only when both sides support them.

Use a curated catalog or downstream registry feed for discovery. The official MCP Registry provides metadata. A registry listing is not a compatibility or security guarantee.

**Permissions and credentials**

Enforce permissions in trusted code outside the model. Use project, account, resource, and tool-level grants. Keep sign-in consent separate from permission to perform a write.

Expose only enabled tools needed for the current task. Connecting many services should not put every tool into every model request.

Use a protected local credential vault with operating system integration where available. Keep secrets out of repository files, chat transcripts, logs, exports, and generated-code sandboxes. Supply each connector only the credentials it requires. Revocation should disconnect the account and stop further authorized use.

Evaluate Vercel Connect as an optional hosted credential service. Explain its credential custody, account setup, availability, and billing before enabling it. Keep direct local connection methods where providers support them.

For the initial local release, refresh remote state on demand or with bounded polling. Receiving external webhooks requires a reachable endpoint or relay. Make any relay an explicit optional service.

**Extensibility for startups**

Publish a connector SDK and a versioned manifest format. A manifest should identify the publisher, connection type, installation version, runtime support, authentication method, setup fields, capabilities, permissions, and test.

Simple connectors should use manifest data. Complex integrations may need reviewed adapter code. Neither catalog data nor imported configuration should automatically execute commands before the user enables the connection.

Allow startups to submit connectors without changing the desktop core. Provide an automated compatibility test kit. Update the catalog independently from the desktop release. Preserve pinned versions and rollback information.

**OpenClaw parity for app development**

Take OpenClaw capabilities by category. Do not copy its personal-assistant shape. Trolley stays a development product. Scope each capability as Now, Next, Later, or Never.

| OpenClaw capability | Trolley scope | Rule |
|---|---|---|
| Gateway as control plane | Now | `trolley-agentd` is the gateway: one local API, session routing, approvals, logs, and health checks. |
| Channels (chat apps and web) | Next | Add Telegram, Slack, and Discord for status, approvals, and new tasks. Keep code review in the desktop app. |
| Automation (cron and always-on work) | Next | Add scheduled tasks, repo monitors, failed-check watchers, and a morning digest for each workspace. |
| Workspace memory | Next | Add one memory file for each project. Show each item. Let the user edit or delete it. Keep secrets out. |
| Skills and plugin ecosystem | Next | Grow the tested skill library into a catalog with publisher, version, permissions, and rollback. A skill still grants no tool access. |
| Browser control | Next | Add Playwright browser control for app tests and previews first. General web automation comes later. |
| Remote approvals and nodes | Later | Let a phone approve a plan, stop a run, or read a result. Use Tailscale or a relay only with clear consent. |
| Voice and canvas | Later | Add voice control and a visual canvas last. They help control, but they do not build apps better. |
| Life tools (mail, calendar, personal data) | Never for the first product | These tools dilute the dev focus. Add a tool only when it serves a development task. |

Parity does not change the core lead: parallel coding agents, isolated forks, real tests, score-based selection, and one-click ship with rollback. OpenClaw breadth goes into that dev core.

**Proposed build order**

1. Prove the local Linux runtime, workspace model settings, Codex task loop, Git changes, and GitHub draft pull request workflow on Windows.
2. Build agent profiles, a small tested skill library, the connection manager, and generic local/remote MCP setup.
3. Add role templates and a small tested connector catalog across hosting, planning, databases, and observability.
4. Add Claude and Antigravity adapters, recovery, and installer improvements.
5. Add optional AI Gateway and Vercel Sandbox execution.
6. Add the OpenClaw parity Next set: Channels, Automation, Workspace memory, the skills catalog, and browser control for tests.
7. Add the Later set: Remote approvals and nodes, then voice and canvas.
8. Validate macOS and Linux installation, then publish the connector SDK and contribution process.

Exact catalog providers and release scope remain to be selected. Prefer a small tested set plus a working custom path over an untested list of integrations.

**Score first: evaluation, tournaments, and rapid ship**

Score first. Build the score before the swarm. A parallel agent feature without a score creates more code for the user to read.

1. Give each eval task a test that passes or fails. Do not use an opinion score in place of a test result.
2. Record the model, agent, skills, image, and base commit for each run. Compare runs only when these facts are known.
3. Run a tournament when the user asks for the best result. Run the same task in separate forks. Run the same tests on each fork. Show each score and name one winner.
4. Keep the losing forks. The user can inspect a losing diff or delete it. Do not merge a losing diff by default.
5. Improve the harness from run data. Save the task, the diff, the test result, and the final user choice. Get consent before any data leaves the computer. Keep secrets and private code out of training data by default.

Make rapid ship a user feature, not a team rule. The user chooses when to ship. Trolley makes that choice safe and fast.

1. Keep each task small. One task makes one clear change.
2. Run tests during the task, not only at the end. Show the result next to the diff.
3. Show a ship readiness gate before the user ships. The gate shows test state, score state, review state, and the rollback point.
4. Put new work behind a feature flag when the project supports flags. The user can turn work off without a new deploy.
5. Save a rollback point before apply, merge, or deploy. One action restores that point.
6. Support preview, commit, push, draft pull request, merge, and deploy as separate steps. The user can stop at any step.

Frontier practices to adopt now: stacked small diffs, trunk-based work in short-lived workspaces, preview environments for each workspace, policy checks that run in the trusted layer, and a command menu for every frequent action. Reject practices that add speed but remove proof.

**Acceptance criteria**

- On a clean supported machine, complete the standard workflow without manual JSON editing or host development-tool installation.
- Open a local repository, fix a failing test, review the exact changes, preserve existing local work, and create an authorized draft pull request.
- Select different models for two workspaces without changing either workspace's account or skill configuration unexpectedly.
- Create an agent from a template, enable recommended skills, complete required connections, and pass its setup test through the GUI.
- Assign different supported models and skill sets to two agents in one workspace. Keep their writes isolated and their results attributable.
- Record each run's model, account reference, skill versions, tool grants, runtime image, and starting Git state. Preserve this record across recovery.
- Disable a skill for one agent without changing another agent's assignment.
- Stop an unavailable model cleanly or use only a fallback policy the user has approved. Never silently incur additional API charges.
- Connect one local MCP server and one authenticated remote MCP server through the GUI.
- Detect an expired credential and offer a working sign-in repair flow.
- Prevent a tool enabled for one project from being used in a different project without a grant.
- Preserve project settings across restarts without exporting secrets.
- Recover from a disconnected UI without repeating a completed external write.
- Add a connector through the SDK and catalog without changing the core connection manager.
- Report tested operating systems, CPU architectures, server versions, and known limits.
- Identify the project, workspace, branch, selected agent and model, and execution target without opening settings.
- Keep the terminal on the right during chat, review, and preview. Preserve drafts and session state while opening Settings or changing views.
- Open Settings from the application menu or keyboard. Restore the last settings category. Identify whether a setting affects the application, workspace, agent, or next run.
- Use the main UI flow with the keyboard and at supported laptop widths. Keep the layout readable when panels collapse.

**Latest workflow requirements**

- Support multiple chats per isolated workspace. Keep drafts and plan modes independent. Coordinate writes with a checkout lease or isolated child workspace.
- Require approval of a specific plan revision before that chat enters Build. Reject leaves the chat in Plan.
- Show one suggested Git action based on branch, working tree, pull request, and check state. Prepare reviewable commit, push, PR, merge, and archive actions.
- Pin CI logs and review evidence to a commit. Prepare failed-check and merge-conflict tasks with the relevant paths and logs. Invalidate readiness when the candidate changes.
- Store immutable per-turn workspace snapshots. Open historical diffs as read-only. Preserve the chat that produced each change.
- Assign a reviewer model and record its findings against the reviewed revision. Support source and Markdown preview without executing embedded content.
- Add a full-height terminal option within the right column. Preserve real shell sessions through navigation and reconnect. Verify sustained output, stop behavior, and crash recovery with a persistent terminal backend.
- Provide project, runtime/AI, and setup-script onboarding. Allow agent-drafted setup scripts, with an editable preview before execution.
- Configure direct API, AI Gateway, Bedrock, Vertex, and custom endpoints as distinct billing routes. Validate model capabilities and account access before a run. Subscription bridges stay separate.
- Scope environment settings to application defaults, workspace, or agent. Keep secret values in the system credential store and outside chat transcripts, exported settings, and untrusted runtime logs. Pass only granted values into a run.
- Add completion and failure notifications, `/clear`, `/compact`, file browsing, line highlighting, and installed-editor discovery. Use relative commit times and the action label “Discard” for uncommitted changes.

The interactive design implements local demonstrations of these flows. It does not yet supply their backend or runtime guarantees. AI review and per-turn diff patterns were adapted from [Conductor 0.22.0](https://www.conductor.build/changelog/0.22.0-code-review-and-historical-diffs).

**Portfolio outputs**

Publish runnable examples, task evaluations, architecture explanations, and installation walkthroughs after approval. Demonstrate AI Gateway routing, Sandbox execution, GitHub workflows, and connector setup.

Collect developer setup failures and task outcomes with consent. Record how this feedback changes the product. Contribute reproducible issues and fixes upstream.

**Reference documentation**

- [MCP transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports): local stdio and remote Streamable HTTP.
- [MCP authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization): HTTP authentication requirements and distinct stdio credential handling.
- [MCP Registry](https://modelcontextprotocol.io/registry/about): discovery metadata, downstream catalogs, and the scope of registry verification.
- [Vercel Connect](https://vercel.com/docs/connect): managed credentials and provider-specific setup.
- [Git worktrees](https://git-scm.com/docs/git-worktree): multiple working trees and shared repository metadata.
- [GitHub CLI sign-in](https://cli.github.com/manual/gh_auth_login): supported first-prototype authentication.
- [Codex app-server](https://learn.chatgpt.com/docs/app-server): embedded Codex conversations, events, and approvals.
- [Agent Skills overview](https://agentskills.io/home): portable instructions, resources, and task-based loading.
- [Agent Skills specification](https://agentskills.io/specification): package metadata, compatibility, and format requirements.
- [eve agent configuration](https://github.com/vercel/eve/blob/main/docs/agent-config.md): model and runtime configuration for agents.
- [ChatGPT plan integration](https://developers.openai.com/siwc/token-sharing-open-source/codex-app-server): plan-backed integration and token renewal.
- [Claude plan integration](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan): current subscription integration guidance.
- [Antigravity SDK](https://www.antigravity.google/docs/sdk/overview/): official SDK documentation.
- [AI Gateway](https://vercel.com/docs/ai-gateway): optional API routing and spend controls.
- [Vercel Sandbox](https://vercel.com/docs/sandbox): optional Linux microVM execution.
