const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Ejecuta utilidades TypeScript del proyecto sin incorporar un runner adicional.
const cache = new Map();
function load(relative) {
  const filename = path.resolve(__dirname, "../", relative);
  if (cache.has(filename)) return cache.get(filename);
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = { exports: {} };
  const localRequire = name => name.startsWith("@/") ? load("src/" + name.slice(2) + ".ts") : require(name);
  new Function("require", "module", "exports", output)(localRequire, mod, mod.exports);
  cache.set(filename, mod.exports);
  return mod.exports;
}
const plans = load("src/config/plans.ts");
const links = load("src/lib/deep-links.ts");
const dates = load("src/lib/date.ts");
const demo = load("src/lib/demo.ts");
test("los cuatro planes habilitan exactamente sus módulos y respetan ocultos", () => {
  const expected = [
    ["hero", "countdown", "rsvp"],
    ["hero", "countdown", "rsvp", "customTheme", "location", "giftRegistry", "story"],
    ["hero", "countdown", "rsvp", "customTheme", "location", "giftRegistry", "story", "audio", "gallery", "dressCode", "smartCopyClabe"],
    Object.keys(plans.FEATURE_MIN_PLAN),
  ];
  plans.PLANS.forEach((plan, index) => {
    const enabled = Object.keys(plans.FEATURE_MIN_PLAN).filter(feature => plans.hasFeature(plan, feature));
    assert.deepEqual(enabled.sort(), expected[index].sort());
    assert.equal(plans.getFeatureAccess({ plan, preview: true, hiddenSections: ["hero"] }, "hero"), "hidden");
  });
  assert.equal(plans.getFeatureAccess({ plan: "express", preview: true, hiddenSections: [] }, "gallery"), "locked");
});
test("URLs codificadas y protocolos externos seguros", () => {
  const url = new URL(links.whatsappUrl("+52 55 0000 0000", "Sí & voy 😊"));
  assert.equal(url.pathname, "/525500000000");
  assert.equal(url.searchParams.get("text"), "Sí & voy 😊");
  assert.equal(new URL(links.googleMapsUrl({lat:19.4,lng:-99.1})).searchParams.get("query"), "19.4,-99.1");
  assert.equal(new URL(links.wazeUrl({lat:19.4,lng:-99.1})).searchParams.get("ll"), "19.4,-99.1");
  for (const value of ["javascript:alert(1)", "data:text/html,test", "invalid"]) assert.equal(links.safeExternalUrl(value), undefined);
});
test("fechas con zona explícita e independencia de la zona del servidor", () => {
  assert.equal(dates.formatEventDate("2027-06-12T23:00:00Z", "America/Mexico_City").time, "17:00 h");
  assert.throws(() => dates.formatEventDate("2027-06-12T17:00:00", "America/Mexico_City"), /ISO/);
  assert.throws(() => dates.formatEventDate("invalid", "America/Mexico_City"), /ISO/);
});
test("producción ignora los cambios de plan y preview en URL", () => {
  const env = { NODE_ENV: process.env.NODE_ENV, BRAVI_DEMO_MODE: process.env.BRAVI_DEMO_MODE };
  try {
    process.env.NODE_ENV = "production";
    delete process.env.BRAVI_DEMO_MODE;
    assert.deepEqual(demo.resolveDemoOverrides({plan:"elite",preview:"1"}, "express"), {plan:"express",preview:false,demo:false});
    process.env.NODE_ENV = "development";
    assert.equal(demo.resolveDemoOverrides({plan:"signature"}, "express").plan, "signature");
    assert.equal(demo.resolveDemoOverrides({plan:"invalid"}, "express").plan, "express");
  } finally {
    for (const [key,value] of Object.entries(env)) value === undefined ? delete process.env[key] : process.env[key] = value;
  }
});
