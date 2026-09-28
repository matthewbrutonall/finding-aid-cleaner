---
name: finding-aid-cleaner
description: Clean plain-text finding aids with a bundled deterministic helper when OCR line breaks, hard wrapping, excess whitespace, blank lines, or adjacent initials need normalization. Do not use for OCR, PDF/DOCX extraction, editorial rewriting, abbreviation expansion, or factual correction.
---

# Finding-aid Cleaner

Use the bundled helper instead of reproducing its transformations in prose. Resolve the script path relative to this `SKILL.md`:

```bash
node <skill-directory>/scripts/clean_finding_aid.mjs <input.txt>
```

The helper reads one UTF-8 plain-text file and writes JSON to stdout. Pass `-` to read stdin. The JSON contains the cleaned text, skill version, character counts, per-rule change counts, caveats, and a guarded chat prompt. Diagnostics go to stderr. It never writes or replaces the source file.

If the user requests saved output, write the returned `cleanedText` and JSON report only to new paths. Do not replace an existing file without the user's explicit approval.

After running:

- Report the output paths and the change counts.
- Tell the user to compare the result with the source.
- Treat the cleaned text as supplied evidence, not a completed finding aid.
- Do not claim that names, dates, abbreviations, or missing entries were verified.
- Do not send source text to an API or add AI rewriting.

Example:

```bash
printf 'The corres-\npondence of J.Smith.' | \
  node <skill-directory>/scripts/clean_finding_aid.mjs -
```
