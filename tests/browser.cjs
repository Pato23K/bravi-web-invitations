const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const artifacts = path.resolve(__dirname, "../artifacts");
fs.mkdirSync(artifacts, { recursive: true });
const templates = ["romantic-classic", "modern-minimal", "festive"];
const plans = ["express", "esencial", "signature", "elite"];
const minPlan = { inicio:0, "cuenta-regresiva":0, confirmar:0, historia:1, ubicacion:1, regalos:1, galeria:2, vestimenta:2, itinerario:3, hospedaje:3 };
(async () => {
  let combinations = 0;
  for (const [engine, type] of Object.entries({chromium, webkit})) {
    const browser = await type.launch();
    try {
      for (const width of [390, 412, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: width === 412 ? 915 : 844 }, hasTouch: width < 500 });
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        for (const template of templates) for (const [index, plan] of plans.entries()) {
          await page.goto(base + "/?template=" + template + "&plan=" + plan);
          await page.locator("#inicio").waitFor();
          assert.equal(await page.locator(".invitation").getAttribute("data-template"), template);
          for (const [id, min] of Object.entries(minPlan)) assert.equal(await page.locator("#" + id).count(), index >= min ? 1 : 0, engine + " " + template + " " + plan + " " + id);
          assert.equal(await page.locator("audio").count(), index >= 2 ? 1 : 0);
          if (index >= 2) assert.equal(await page.locator("audio").evaluate(el => el.paused), true);
          const opening = page.getByRole("button", {name:"Abrir invitación", exact:true});
          if (await opening.count()) {
            await opening.focus();
            await page.keyboard.press("Enter");
            await page.waitForFunction(() => document.querySelector(".invitation-cover")?.getBoundingClientRect().height === 0);
            assert.equal(await page.evaluate(() => document.activeElement.id), "invitation-content");
          }
          const dimensions = await page.evaluate(() => ({ scroll:document.documentElement.scrollWidth, width:innerWidth }));
          assert.ok(dimensions.scroll <= dimensions.width, JSON.stringify({engine,template,plan,width,dimensions}));
          if (engine === "chromium" && width === 390 && plan === "elite") {
            // Activa las transiciones de cada sección antes de capturar.
            for (const section of await page.locator("main section").all()) await section.scrollIntoViewIfNeeded();
            await page.locator("#inicio").scrollIntoViewIfNeeded();
            await page.waitForTimeout(1000); // Deja terminar las transiciones antes de capturar.
            await page.screenshot({ path:path.join(artifacts, template + "-390.png"), fullPage:true });
          }
          combinations++;
        }
        assert.deepEqual(errors, [], engine + " errores de cliente");
        await page.close();
      }
      const page = await browser.newPage({ viewport:{width:390,height:844}, reducedMotion:"reduce" });
      await page.goto(base + "/invitaciones/boda");
      assert.equal(await page.locator("video").count(), 0);
      await page.screenshot({path:path.join(artifacts, engine + "-opening-390.png")});
      await page.getByRole("button", {name:"Abrir invitación", exact:true}).click();
      await page.waitForFunction(() => document.querySelector(".invitation-cover")?.getBoundingClientRect().height === 0);
      const copy = page.getByRole("button", {name:/Copiar CLABE/});
      await page.evaluate(() => {
        Object.defineProperty(navigator, "clipboard", {configurable:true,value:{writeText:async () => {throw Error("denied")}}});
        document.execCommand = () => false;
      });
      await copy.click();
      await page.getByRole("status").filter({hasText:"No se pudo copiar"}).waitFor();
      await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {configurable:true,value:{writeText:async text => {window.__copied = text}}}));
      await copy.click();
      assert.equal(await page.evaluate(() => window.__copied), "000000000000000000");
      await page.getByRole("button", {name:"Ver foto 3"}).click();
      await page.waitForFunction(() => document.querySelector('[aria-label="Ver foto 3"]')?.getAttribute("aria-current") === "true");
      const whatsapp = new URL(await page.locator("#confirmar a").getAttribute("href"));
      assert.ok(whatsapp.searchParams.get("text").includes("Sofía"));
      await page.clock.setFixedTime(new Date("2028-01-01T00:00:00Z"));
      await page.getByText("¡Llegó el gran día!").waitFor();
      await page.goto(base + "/invitaciones/encuentro");
      assert.equal(await page.locator("#regalos").count(), 0);
      assert.equal(await page.locator(".invitation-cover").count(), 0);
      await page.goto(base + "/?plan=express&preview=1");
      assert.ok(await page.getByText("Disponible en plan", {exact:false}).count() > 0);
      await page.goto(base + "/demo");
      await page.locator('select[name="example"]').selectOption("quince");
      await page.locator('select[name="template"]').selectOption("festive");
      await page.locator('select[name="plan"]').selectOption("express");
      await page.getByRole("button", {name:"Actualizar vista"}).click();
      await page.waitForURL(/example=quince/);
      assert.equal(await page.locator(".invitation").getAttribute("data-plan"), "express");
      assert.equal(await page.locator("#inicio h1").innerText(), "Valentina");
      await page.route("**/_next/image?**", route => route.abort());
      await page.goto(base + "/invitaciones/quince");
      await page.locator("#galeria").scrollIntoViewIfNeeded();
      await page.locator("#galeria .media-fallback").first().waitFor();
      await page.close();
      console.log(engine + ": matriz y pruebas de interacción OK");
    } finally { await browser.close(); }
  }
  console.log(combinations + " combinaciones verificadas; capturas en artifacts/");
})().catch(error => {console.error(error); process.exitCode = 1;});
