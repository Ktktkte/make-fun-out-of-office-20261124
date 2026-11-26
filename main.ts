// Out-of-office v2 — program/v1 entry.
// Reads entry.txt sitting next to this script and copies it byte-for-byte
// to $MAKEFUN_OUTPUT_DIR/entry.txt. No dependencies, no network.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 160;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const text = readFileSync(entryPath, "utf8");

// All gate checks live in one place so the entry can never reach the
// output dir unvalidated: non-empty, a single line, within the 160-char cap.
function validateEntry(entry) {
  if (entry.trim().length === 0) {
    throw new Error("entry.txt is empty or whitespace-only");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry.txt must be a single line");
  }
  if ([...entry].length > MAX_CHARS) {
    throw new Error(`entry.txt exceeds ${MAX_CHARS} characters`);
  }
}

validateEntry(text);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
