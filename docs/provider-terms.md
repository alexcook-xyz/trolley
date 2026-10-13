# Provider terms check

Status: open. No adapter is approved by this file yet.

Check each provider before you build its adapter. A model list does not prove account access. A working login does not prove that the terms allow a third-party client.

| Provider | Source to inspect | Checked (date) | Verdict | Next action |
|---|---|---|---|
| Codex (ChatGPT subscription) | https://learn.chatgpt.com/docs/app-server and the ChatGPT plan integration link in `docs/product-brief.md` | Not yet | Open | Read the app-server auth rules. Confirm that a third-party desktop client can use the subscription route. |
| Claude (Claude subscription) | https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan | Not yet | Open | Read the Agent SDK plan rules. Confirm the plan, limits, and client rules before you build. |
| Antigravity | https://antigravity.google/docs/sdk/overview | Not yet | Open | Read the SDK terms. Confirm the auth route and client rules before you build. |
| Gemini CLI | Provider docs for the Gemini CLI route | Not yet | Open | Find the official auth and client rules. Do not assume the Antigravity verdict covers this route. |

## Rules

1. Record the source URL, the date, and one short verdict for each provider.
2. Use only a method that the source permits.
3. Check each agent CLI license before you bundle the CLI in the VM image. If a license blocks bundling, download that CLI on first use.
4. Do not scrape, copy, or share subscription tokens.
5. Do not move a user to a paid API route without clear approval.
6. If a source gives no clear answer, keep the verdict open. Build that adapter last.
