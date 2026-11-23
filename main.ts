// Out-of-office auto-reply entry: writes the single reply line to /output/entry.txt.
// The reply text lives in entry.txt next to this script; this program only copies it
// into the grader's output directory, unchanged.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.txt");
const text = readFileSync(source, "utf8");

// Gate: 1 to 160 characters of UTF-8 text, not only whitespace.
const trimmed = text.trim();
if (trimmed.length < 1 || trimmed.length > 160) {
  throw new Error(`entry.txt must be 1-160 characters, got ${trimmed.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read-back: the grader's output must be byte-identical to entry.txt.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("output does not match entry.txt");
}
