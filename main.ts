// Lumbung — Anggaran Rumah Tangga: entry program (Node 22, standard library
// only). The site lives in app/ beside this file as plain static files —
// index.html plus ES modules and one stylesheet, no build step, nothing
// fetched over the network. This program hands the entry in: it copies app/
// and screenshots/ into the output directory and writes dossier.json there
// with the vendored make.fun library, so the judge reads exactly what the
// scorer's own copy of that library would write. Leave
// vendor/makefun-frontend.ts untouched.
//
// Serve the site locally with `node serve.ts`, then open
// http://localhost:8080. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps: at most 4 screenshots, each at most 256 KiB; at
// most 993 files and directories in app/, at most 16 MiB of app files; the
// first-load text budget shapes the dossier bytes.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
