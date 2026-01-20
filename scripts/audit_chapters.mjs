// scripts/audit_chapters.mjs
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const chapterFiles = [
  "src/content/nachtzug19/scenes/c1.ts",
  "src/content/nachtzug19/scenes/c2.ts",
  "src/content/nachtzug19/scenes/c3.ts",
  "src/content/nachtzug19/scenes/c4.ts",
  "src/content/nachtzug19/scenes/c5.ts",
  "src/content/nachtzug19/scenes/c6.ts",
  "src/content/nachtzug19/scenes/c7.ts",
];

function isSceneLike(v) {
  return v && typeof v === "object" && typeof v.id === "string" && typeof v.chapter === "number" && Array.isArray(v.choices);
}

function findScenesExport(mod) {
  // Try common patterns: export const scenes = {...}, export default {...}, export const c1 = {...}
  for (const key of Object.keys(mod)) {
    const val = mod[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      const values = Object.values(val);
      if (values.length > 0 && values.every(isSceneLike)) return val;
    }
  }
  if (mod.default && typeof mod.default === "object") {
    const values = Object.values(mod.default);
    if (values.length > 0 && values.every(isSceneLike)) return mod.default;
  }
  return null;
}

function wordCount(s) {
  if (!s || typeof s !== "string") return 0;
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function getChoiceConditionCount(scene) {
  return scene.choices?.filter((c) => c && c.condition).length ?? 0;
}

function getChoiceCount(scene) {
  return scene.choices?.length ?? 0;
}

function collectNextTargets(scene) {
  const nexts = [];
  for (const c of scene.choices ?? []) {
    if (c?.next) nexts.push(String(c.next));
  }
  return nexts;
}

function collectEndings(scene) {
  const ends = [];
  for (const c of scene.choices ?? []) {
    if (c?.ending) ends.push(String(c.ending));
  }
  return ends;
}

function hasStationEnd(scene) {
  return Array.isArray(scene.tags) && scene.tags.includes("station_end");
}

function hasControl(scene) {
  return Array.isArray(scene.tags) && scene.tags.includes("control");
}

function tagCount(scenes, tag) {
  return Object.values(scenes).filter((s) => Array.isArray(s.tags) && s.tags.includes(tag)).length;
}

function summarizeChapter(scenes) {
  const sceneList = Object.values(scenes);
  const scenesCount = sceneList.length;
  const choicesTotal = sceneList.reduce((a, s) => a + getChoiceCount(s), 0);
  const conditionsTotal = sceneList.reduce((a, s) => a + getChoiceConditionCount(s), 0);
  const wordsTotal = sceneList.reduce((a, s) => a + wordCount(s.narrative), 0);

  const stationEnds = sceneList.filter(hasStationEnd);
  const controls = sceneList.filter(hasControl);

  const approxMinutes = (wordsTotal / 190) + (choicesTotal * 0.15);

  return {
    scenesCount,
    choicesTotal,
    conditionsTotal,
    wordsTotal,
    approxMinutes,
    stationEnds: stationEnds.map((s) => s.id),
    controls: controls.map((s) => s.id),
    interludes: tagCount(scenes, "interlude"),
    setpieces: tagCount(scenes, "setpiece"),
  };
}

function validateGraph(allScenesById, chapterName, scenes) {
  const errors = [];
  const warnings = [];

  // Basic schema checks
  for (const s of Object.values(scenes)) {
    if (!s.id || typeof s.id !== "string") errors.push(`[${chapterName}] Scene without valid id`);
    if (!Array.isArray(s.choices) || s.choices.length < 1) errors.push(`[${chapterName}] ${s.id}: no choices`);
    if ((s.choices?.length ?? 0) > 4) errors.push(`[${chapterName}] ${s.id}: > 4 choices`);
    for (const c of s.choices ?? []) {
      if (!c?.id) errors.push(`[${chapterName}] ${s.id}: choice without id`);
      if (!Array.isArray(c?.effects) || c.effects.length < 1) errors.push(`[${chapterName}] ${s.id}/${c.id}: missing effects`);
      const hasNext = !!c?.next;
      const hasEnd = !!c?.ending;
      if (!hasNext && !hasEnd) errors.push(`[${chapterName}] ${s.id}/${c.id}: missing next/ending`);
      if (hasNext && hasEnd) warnings.push(`[${chapterName}] ${s.id}/${c.id}: has BOTH next and ending (unusual)`);
    }
  }

  // next targets must exist (allow to point into c5+ or external endings, but warn)
  for (const s of Object.values(scenes)) {
    for (const next of collectNextTargets(s)) {
      if (!allScenesById.has(next)) {
        // allow "c5_" forward refs but warn
        if (/^c[5-9]_/.test(next)) warnings.push(`[${chapterName}] ${s.id}: next -> ${next} (forward ref, ok if chapter exists)`);
        else errors.push(`[${chapterName}] ${s.id}: next -> ${next} (missing scene)`);
      }
    }
  }

  // station_end must exist
  const stationEnds = Object.values(scenes).filter(hasStationEnd);
  if (stationEnds.length === 0) errors.push(`[${chapterName}] missing station_end scene`);
  if (stationEnds.length > 1) warnings.push(`[${chapterName}] multiple station_end scenes: ${stationEnds.map(s=>s.id).join(", ")}`);

  return { errors, warnings };
}

async function main() {
  console.log("NACHTZUG19 audit (chapters 1-7)\n");

  // Import TS via tsx runtime (npx tsx ...) or node --loader.
  const imported = [];
  for (const rel of chapterFiles) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`Missing file: ${rel}`);
      process.exitCode = 2;
      continue;
    }
    const mod = await import(pathToFileURL(abs).href);
    const scenes = findScenesExport(mod);
    if (!scenes) {
      console.error(`Could not find scenes export in ${rel}. Ensure it exports an object of scenes.`);
      process.exitCode = 2;
      continue;
    }
    imported.push({ rel, scenes });
  }

  // Build global scene index
  const allScenesById = new Map();
  for (const { scenes } of imported) {
    for (const s of Object.values(scenes)) allScenesById.set(s.id, s);
  }

  // Summary per chapter
  for (const { rel, scenes } of imported) {
    const name = path.basename(rel, ".ts");
    const sum = summarizeChapter(scenes);

    console.log(`== ${name.toUpperCase()} ==`);
    console.log(`Scenes: ${sum.scenesCount} (target 22–28)`);
    console.log(`Choices: ${sum.choicesTotal} (target 30–45)`);
    console.log(`Conditions: ${sum.conditionsTotal} (target: >= 5 for depth)`);
    console.log(`Words: ${sum.wordsTotal} (target 5000–6500)`);
    console.log(`Estimated runtime: ${sum.approxMinutes.toFixed(1)} min (target 30–35, min 20)`);
    console.log(`station_end: ${sum.stationEnds.join(", ") || "NONE"}`);
    console.log(`control: ${sum.controls.join(", ") || "none"}`);
    console.log(`tags count: interlude=${sum.interludes}, setpiece=${sum.setpieces}`);
    console.log("");
  }

  // Rules: c2/c3 must have control
  const byName = Object.fromEntries(imported.map(({ rel, scenes }) => [path.basename(rel, ".ts"), scenes]));
  for (const ch of ["c2", "c3"]) {
    const scenes = byName[ch];
    if (scenes) {
      const has = Object.values(scenes).some(hasControl);
      if (!has) console.warn(`WARNING: ${ch} has no 'control' tagged scene (canon expects control in chapter ${ch.slice(1)}).`);
    }
  }

  // Graph validation
  let totalErrors = 0;
  let totalWarnings = 0;
  for (const { rel, scenes } of imported) {
    const name = path.basename(rel, ".ts");
    const { errors, warnings } = validateGraph(allScenesById, name, scenes);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    for (const e of errors) console.error("ERROR:", e);
    for (const w of warnings) console.warn("WARN:", w);
  }

  console.log(`\nDone. Errors=${totalErrors}, Warnings=${totalWarnings}`);
  if (totalErrors > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
