# Finding-aid Cleaner skill

![Untidy plain-text finding aid carefully reformatted into a readable page](assets/finding-aid-cleaner.png)

A **finding aid** is a guide that helps people discover and use an archival collection. When an old guide is copied from a scan or wrapped to fit a narrow page, its text may have broken words, awkward line endings, and extra spaces. This **agent skill** helps an assistant tidy that formatting.

For example, it can turn `The corres-` followed on the next line by `pondence of J.Smith` into `The correspondence of J. Smith`. The example changes spacing and line breaks; it does not decide whether the name or description is correct.

It is useful for archivists preparing a plain-text finding aid for review, reuse, or later import. You give the agent a UTF-8 text file; it runs the bundled local script and reports the cleaned text and what changed.

## What it changes

It can:

- join words broken across line endings;
- join hard-wrapped lines;
- remove excess spaces and blank lines; and
- change adjacent initials such as `J.Smith` to `J. Smith`.

The bundled script applies the same rules every time. It runs locally and does not upload the text or call an AI service. The agent uses the script and explains the result; the script supplies the actual cleanup.

It does not perform OCR, process PDF/DOCX/image files, rewrite descriptions, expand abbreviations, or correct facts. Compare the cleaned text with the original, especially where a line break might have been meaningful.

The source file stays unchanged. The helper prints its result rather than saving a new file automatically. If you ask the agent to save cleaned text or a report, it should use new output paths and show you the change counts.

## Set it up with your AI agent

Copy and paste this into an agent that can install skills on your computer:

```text
Install the Finding-aid Cleaner skill from https://github.com/matthewbrutonall/finding-aid-cleaner using your agent's supported skill installation method. Keep `SKILL.md` and the bundled `scripts` directory together. Check that Node.js is available, confirm the skill is available, and tell me how to invoke it. Do not clean any files yet.
```

Once installed, you can ask: “Use the Finding-aid Cleaner skill on `finding-aid.txt`. Show me the cleaned text and change counts, and leave the source file alone.”

## Run the bundled helper yourself

You need Node.js. After cloning the repository, run:

```bash
node scripts/clean_finding_aid.mjs finding-aid.txt
```

The helper prints JSON containing the cleaned text and a change report. Use `-` in place of a filename to read piped text. For a dedicated command-line application with saved-output options, see the separate [Finding-aid Cleaner CLI](https://github.com/matthewbrutonall/finding-aid-cleaner-cli). This skill does not require that CLI.
