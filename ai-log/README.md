# AI chat log export

This folder holds an export of this Cursor agent conversation (creator app / Expo / follow-ups). The JSONL has **no** per-message times; `CHAT-EXPORT.md` records **filesystem birth/mtime** on the transcript file as the only non-guessed clock span.

| File | Description |
|------|-------------|
| `cursor-agent-transcript.jsonl` | Full session: one JSON object per line (`role`, `message`). Includes tool calls. |
| `cursor-agent-transcript-other-session.jsonl` | Second transcript file present in the project’s agent-transcripts folder (different thread). |
| `CHAT-EXPORT.md` | Same session rendered as Markdown (tool details summarized; `[REDACTED]` blocks stripped from text). |

**Source on disk:** `~/.cursor/projects/Users-apple-work-react-native-test/agent-transcripts/c975c30c-2070-4ca4-9064-9a33c8e06557/c975c30c-2070-4ca4-9064-9a33c8e06557.jsonl`

To copy elsewhere (e.g. system root `/ai-log`), use:

`sudo mkdir -p /ai-log && sudo cp -R "$(pwd)/ai-log/"* /ai-log/`

(Re-run the export step after new messages if you need an up-to-date file.)
