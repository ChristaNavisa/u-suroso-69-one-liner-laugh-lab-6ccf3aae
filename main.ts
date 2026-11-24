// One-Liner Laugh Lab — entry program.
//
// Writes one short funny line answering the prompt (the excuse a robot
// vacuum gives after eating a sock) to /output/entry.txt.
//
// The line: "The sock was trespassing on the carpet. I have the footage.
// Unfortunately, I ate the footage."
// Deadpan, concrete, and the twist lands on the last word — the footage
// itself gets eaten, so there is no evidence left to argue with.
//
// Deterministic: every run writes exactly the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "The sock was trespassing on the carpet. I have the footage. Unfortunately, I ate the footage.";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validateLine(line: string): void {
  // Gate: entry.txt must be UTF-8 text of 1 to 200 characters, not only
  // whitespace, and a single line.
  if (line.length < 1 || line.length > 200) {
    throw new Error("line must be 1-200 characters");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
}

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  // Read back and verify: the file must hold exactly the line, byte for byte.
  if (readFileSync(outPath, "utf8") !== line) {
    throw new Error("entry.txt does not match the line");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = resolve(dirname(fileURLToPath(import.meta.url)), resolveOutDir());
  writeEntry(outDir, LINE);
}

main();
