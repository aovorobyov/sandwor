---
name: research
description: Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent.
metadata:
  source: https://github.com/mattpocock/skills/tree/5beb35b/skills/engineering/research
  license: MIT, see ../LICENSE-mattpocock-skills
---

Spin up a **background agent** to do the research, so you keep working while it reads.

Its job:

1. Investigate the question against **primary sources** (official docs, source code, specs, first-party APIs), not a secondary write-up of them. Follow every claim back to the source that owns it.
2. Write the findings to a single Markdown file, citing each claim's source.
3. Save it where the repo already keeps such notes; match the existing convention, and if there is none, put it somewhere sensible and say where.

## sandwor.ru

- Notes go to `docs/<topic>.md` plus one line in `docs/README.md`. `docs/` is local only (it is in `.gitignore`, the repo is public): never commit or push research notes, and never copy their content into code or the public `README.md`.
- Write the note in Russian, like the rest of `docs/`.
