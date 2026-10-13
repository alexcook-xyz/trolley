# Provider terms check

Status: checked on 2026-10-13 from official sources. Terms can change. Re-check each source before you ship an adapter.

Check each provider before you build its adapter. A model list does not prove account access. A working login does not prove that the terms allow a third-party client.

| Provider | Source inspected | Checked | Verdict | Next action |
|---|---|---|---|---|
| Codex (ChatGPT subscription) | https://learn.chatgpt.com/docs/app-server ; https://developers.openai.com/siwc/token-sharing-open-source/codex-app-server | 2026-10-13 | Permitted for Proof A. Production use stays open. The app-server exists to embed Codex in your product, with ChatGPT browser sign-in and an OAuth token route for the ChatGPT plan. OpenAI marks the app-server command experimental and not supported for production workloads. | Build Proof A on this route. Re-check production support before release. |
| Claude (Claude subscription) | https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan | 2026-10-13 | Permitted. The article states that the Claude Agent SDK, `claude -p`, and third-party apps can draw from subscription limits. A June 15, 2026 update pauses a planned change to this rule. | Build this adapter second. Watch the same article for the paused change. |
| Antigravity | https://antigravity.google/docs/sdk/overview | 2026-10-13 | Open. The SDK overview shows Vertex AI with Google Cloud credentials and enterprise sign-in routes. It does not give a clear consumer subscription route for a third-party desktop app. | Build this adapter last. Confirm a consumer sign-in route, or use the enterprise and Vertex route. |
| Gemini CLI | https://google-gemini.github.io/gemini-cli/docs/get-started/authentication.html ; https://google-gemini.github.io/gemini-cli/docs/tos-privacy.html | 2026-10-13 | Permitted to run the CLI. Bundling stays open. Login with Google opens a browser flow. AI Pro and AI Ultra users sign in with the subscription account. A free tier exists with rate limits. The docs do not by themselves grant a right to redistribute the CLI in our VM image. | Run the CLI as installed. Check the CLI license before bundling, or download it on first use. |

## Rules

1. Record the source URL, the date, and one short verdict for each provider.
2. Use only a method that the source permits.
3. Check each agent CLI license before you bundle the CLI in the VM image. If a license blocks bundling, download that CLI on first use.
4. Do not scrape, copy, or share subscription tokens.
5. Do not move a user to a paid API route without clear approval.
6. If a source gives no clear answer, keep the verdict open. Build that adapter last.
