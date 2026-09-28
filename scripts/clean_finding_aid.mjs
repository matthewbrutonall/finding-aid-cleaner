#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import process from "node:process";

const VERSION = "0.1.0";
const MAX_CHARS = 200_000;
const CAVEATS = [
  "Deterministic text cleanup only; the result is not a rewritten or completed finding aid.",
  "Review every change against the source before using the cleaned text.",
  "Names, dates, abbreviations, and missing entries are not inferred or expanded."
];

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function cleanFindingAidText(text) {
  let cleaned = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\u0000/g, "").replace(/\f/g, "\n");
  const originalLength = cleaned.length;

  let hyphenJoins = 0;
  cleaned = cleaned.replace(/([A-Za-z])-\n([a-z])/g, (_match, left, right) => {
    hyphenJoins += 1;
    return `${left}${right}`;
  });

  let wrappedLines = 0;
  cleaned = cleaned.replace(/([^\n])\n(?!\n)/g, (_match, character) => {
    wrappedLines += 1;
    return `${character} `;
  });

  let collapsedRuns = 0;
  cleaned = cleaned.replace(/[^\S\n]{2,}/g, () => {
    collapsedRuns += 1;
    return " ";
  });

  let blankLines = 0;
  cleaned = cleaned.replace(/\n{3,}/g, () => {
    blankLines += 1;
    return "\n\n";
  });

  let initialSpaces = 0;
  cleaned = cleaned.replace(/\b([A-Z])\.([A-Z])/g, (_match, first, second) => {
    initialSpaces += 1;
    return `${first}. ${second}`;
  });

  cleaned = cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/[ \t]+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0)
    .join("\n\n");

  const changes = [
    { code: "hyphen_join", label: "Joined hyphenated line-breaks", count: hyphenJoins },
    { code: "line_wrap", label: "Joined hard-wrapped lines", count: wrappedLines },
    { code: "whitespace", label: "Collapsed extra spaces or tabs", count: collapsedRuns },
    { code: "blank_lines", label: "Collapsed extra blank lines", count: blankLines },
    { code: "initials", label: "Spaced initials such as J.Smith", count: initialSpaces }
  ].filter((change) => change.count > 0);

  return {
    skill: "finding-aid-cleaner",
    skillVersion: VERSION,
    originalLength,
    cleanedLength: cleaned.length,
    cleanedText: cleaned,
    changes,
    caveats: CAVEATS,
    chatPrompt: [
      "SUPPLIED SOURCE MATERIAL",
      "The following text was cleaned for OCR line-breaks, extra whitespace and spaced initials. It is supplied evidence, not a completed finding aid.",
      "",
      cleaned,
      "",
      "Please work from this supplied text only. Do not invent names, dates or missing entries."
    ].join("\n")
  };
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath || process.argv.length > 3) {
    process.stderr.write("Usage: clean_finding_aid.mjs <input.txt|->\n");
    return 2;
  }

  let text;
  try {
    text = inputPath === "-" ? await readStdin() : await readFile(inputPath, "utf8");
  } catch (error) {
    process.stderr.write(`Could not read input: ${error.message}\n`);
    return 2;
  }

  if (!text.trim()) {
    process.stderr.write("Provide non-empty finding-aid text.\n");
    return 2;
  }
  if (text.length > MAX_CHARS) {
    process.stderr.write(`Input exceeds the ${MAX_CHARS}-character limit.\n`);
    return 2;
  }

  process.stdout.write(`${JSON.stringify(cleanFindingAidText(text), null, 2)}\n`);
  return 0;
}

process.exitCode = await main();
