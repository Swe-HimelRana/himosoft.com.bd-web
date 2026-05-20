#!/usr/bin/env node
/**
 * Machine-translate content/locales/en.json into de / it / ro / pl via the public Lingva API.
 * Run: node scripts/machine-translate.cjs
 * Only some targets: TARGETS=ro,pl node scripts/machine-translate.cjs
 *
 * Caches lookups under scripts/i18n/.cache/<lang>.json so reruns are cheap.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const EN_PATH = path.join(ROOT, "content/locales/en.json");
const LINGVA = "https://lingva.ml";

const SLASH_TOKEN = "___HS_SLASH___";

const SOURCE = "en";
const TARGETS = process.env.TARGETS
  ? process.env.TARGETS.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : ["de", "it", "ro", "pl"];

/** Leaf key for nav.ctaHref, *.href, etc. — /href$/i matches "href" and "ctaHref". */
function shouldSkipPath(pathStr, value) {
  if (pathStr === "meta.locale") return true;
  const leafMatch = pathStr.match(/(?:^|\.)([^.\[]+)$/);
  const leaf = leafMatch?.[1] ?? "";
  if (leaf === "id") return true;
  if (/href$/i.test(leaf)) {
    if (
      value.startsWith("#") ||
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return true;
    }
  }
  return false;
}

function walkStrings(node, prefix, cb) {
  if (typeof node === "string") {
    cb(prefix, node);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => walkStrings(item, `${prefix}[${i}]`, cb));
    return;
  }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      const p = prefix ? `${prefix}.${k}` : k;
      walkStrings(node[k], p, cb);
    }
  }
}

function collectToTranslate(enObj) {
  const keys = new Set();
  walkStrings(enObj, "", (p, v) => {
    if (shouldSkipPath(p, v)) return;
    keys.add(v);
  });
  return [...keys];
}

function applyTranslations(node, prefix, map, localeCode) {
  if (typeof node === "string") {
    if (prefix === "meta.locale") return localeCode;
    if (shouldSkipPath(prefix, node)) return node;
    return map[node] ?? node;
  }
  if (Array.isArray(node)) {
    return node.map((item, i) =>
      applyTranslations(item, `${prefix}[${i}]`, map, localeCode),
    );
  }
  if (node && typeof node === "object") {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const k of Object.keys(node)) {
      const p = prefix ? `${prefix}.${k}` : k;
      out[k] = applyTranslations(node[k], p, map, localeCode);
    }
    return out;
  }
  return node;
}

async function translateText(text, target, retries = 4) {
  const safe = text.includes("/") ? text.replaceAll("/", SLASH_TOKEN) : text;
  const url = `${LINGVA}/api/v1/${SOURCE}/${target}/${encodeURIComponent(safe)}`;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (typeof data.translation !== "string") throw new Error("Missing translation field");
      const out = data.translation;
      return out.includes(SLASH_TOKEN) ? out.replaceAll(SLASH_TOKEN, "/") : out;
    } catch {
      if (attempt === retries - 1) throw new Error(`translate failed after retries: ${text.slice(0, 48)}…`);
      await sleep(400 * (attempt + 1));
    }
  }
  throw new Error("unreachable");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const enObj = JSON.parse(fs.readFileSync(EN_PATH, "utf8"));
  const strings = collectToTranslate(enObj);
  process.stderr.write(`Unique strings to translate (each locale): ${strings.length}\n`);

  const cacheDir = path.join(ROOT, "scripts/i18n/.cache");
  fs.mkdirSync(cacheDir, { recursive: true });

  for (const target of TARGETS) {
    const cachePath = path.join(cacheDir, `${target}.json`);
    /** @type {Record<string, string>} */
    let cache = {};
    if (fs.existsSync(cachePath)) {
      cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    }

    process.stderr.write(`→ ${target}: filling translation cache…\n`);

    for (let i = 0; i < strings.length; i++) {
      const text = strings[i];
      if (!cache[text]) {
        cache[text] = await translateText(text, target);
        if ((i + 1) % 12 === 0) {
          fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
        }
        await sleep(160);
      }
      process.stderr.write(`\r${target} ${i + 1}/${strings.length}`);
    }

    fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);

    const translated = applyTranslations(enObj, "", cache, target);
    const outPath = path.join(ROOT, "content/locales", `${target}.json`);
    fs.writeFileSync(outPath, `${JSON.stringify(translated, null, 2)}\n`);
    process.stderr.write(`\nWrote ${path.relative(ROOT, outPath)}\n`);
  }

  process.stderr.write("Done.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
