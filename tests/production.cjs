const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3001";
const artifacts = path.resolve(__dirname, "../artifacts");
fs.mkdirSync(artifacts, { recursive: true });
(async () => {
  for (const [engine, type] of Object.entries({ chromium, webkit })) {
    const browser = await type.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
      assert.equal((await page.goto(base + "/demo")).status(), 404);
      await page.goto(base + "/?plan=express&template=festive&example=quince");
      assert.equal(await page.locator(".invitation").getAttribute("data-plan"), "elite");
      assert.equal(await page.locator(".invitation").getAttribute("data-template"), "romantic-classic");
      assert.equal(await page.locator(".demo-toolbar").count(), 0);
      await page.goto(base + "/invitaciones/boda");
      await page.getByRole("button", { name: "Abrir invitación", exact: true }).click();
      // Usa 404 reales: el reproductor nativo de WebKit no siempre pasa por route().
      await page.evaluate(() => {
        const audio = document.querySelector("audio");
        audio.pause(); audio.src = "/media/missing-test.mp3"; audio.load();
        const video = document.querySelector("video");
        if (video) { video.src = "/media/missing-test.mp4"; video.load(); }
      });
      await page.getByRole("button", { name: /Reproducir/ }).click();
      await page.getByRole("status").filter({ hasText: "No se pudo reproducir" }).waitFor();
      await page.waitForFunction(() => document.querySelector("video") === null);
      assert.equal(await page.locator("#inicio img").count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.goto(base + "/invitaciones/encuentro");
      await page.evaluate(() => {
        document.querySelector("audio").play = () => new Promise(() => {});
      });
      await page.getByRole("button", { name: /Reproducir/ }).click();
      await page.getByRole("status").filter({ hasText: "No se pudo reproducir" }).waitFor({timeout:12000});
      await page.close();
      const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
      await nojs.goto(base + "/invitaciones/boda");
      await nojs.locator("#confirmar").scrollIntoViewIfNeeded();
      assert.equal(await nojs.locator("#confirmar").evaluate(el => getComputedStyle(el.parentElement).opacity), "1");
      await nojs.close();
      if (engine === "chromium") {
        for (const [slug, template] of [["boda", "romantic-classic"], ["quince", "festive"], ["encuentro", "modern-minimal"]]) {
          const shot = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
          await shot.goto(base + "/invitaciones/" + slug);
          await shot.screenshot({ path: path.join(artifacts, template + "-cover.png") });
          const opening = shot.getByRole("button", { name: "Abrir invitación", exact: true });
          if (await opening.count()) await opening.click();
          await shot.locator("#inicio").scrollIntoViewIfNeeded();
          await shot.screenshot({ path: path.join(artifacts, template + "-390.png"), fullPage: true });
          await shot.locator("#cuenta-regresiva").scrollIntoViewIfNeeded();
          await shot.screenshot({ path: path.join(artifacts, template + "-detail.png") });
          await shot.close();
        }
      }
      console.log(engine + ": producción, 430 px, medios ausentes, audio pendiente y contenido sin JS OK");
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
