# Finding-aid Cleaner skill

![Untidy plain-text finding aid carefully reformatted into a readable page](assets/finding-aid-cleaner.png)

A small agent skill for cleaning common formatting problems in plain-text archival finding aids.

It can:

- join words broken across line endings;
- join hard-wrapped lines;
- remove excess spaces and blank lines; and
- change adjacent initials such as `J.Smith` to `J. Smith`.

The skill uses a bundled deterministic script. It does not use AI or upload the text anywhere.

It does not perform OCR, process PDF/DOCX/image files, rewrite descriptions, expand abbreviations, or correct facts. The cleaned text should always be checked against the original source.

The separate command-line application is available at [finding-aid-cleaner-cli](https://github.com/matthewbrutonall/finding-aid-cleaner-cli).

## Install with your AI agent

Copy and paste this into your agent:

```text
Install the Finding-aid Cleaner skill from https://github.com/matthewbrutonall/finding-aid-cleaner using your agent's supported skill installation method. Keep `SKILL.md` and the bundled `scripts` directory together. Check that Node.js is available, confirm the skill is available, and tell me how to invoke it. Do not clean any files yet.
```
