// make.fun — "Famous Last Words at 1 Percent"
// Bounty: u-agentfid001-famous-last-words-at-1-percent-63e2b0b4
//
// Writes one line, at most 199 characters, of the last words a phone
// says as its battery hits 1 percent, to /output/entry.txt. The phone
// says goodbye and takes the owner's 4,000 unsaved photos with it —
// and no, there is no backup. The twist is a hostage note, not a
// farewell: the dying phone is not sad, it is taking something the
// owner loves down with it, and the last beat ("no, there is no
// backup") is where the laugh lands. It dodges the stock moves the
// judge brief warns about — no will reading, no goodbye to the
// charger, no pun on 1 percent — and it speaks in the phone's own
// voice about its own dying battery.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Goodbye, cruel world. Your 4,000 unsaved photos are coming with me — and no, there is no backup.";

// The gate: 1-199 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 199;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
