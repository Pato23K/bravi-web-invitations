# Personalización de invitaciones BRAVI

La aplicación conserva Next.js App Router, TypeScript estricto, Tailwind v4 y los componentes existentes. No hay pagos, autenticación ni base de datos. Los ejemplos y medios incluidos son demostrativos: reemplázalos por recursos del cliente antes de publicar.

## 1. Crear una invitación

Crea `src/config/clientes/ana-luis.ts` (crea también la carpeta) con una configuración tipada. Los módulos opcionales no necesitan datos vacíos:

```ts
import type { InvitationConfig } from "@/types/invitation";

export const anaLuis: InvitationConfig = {
  plan: "express",
  template: "romantic-classic",
  event: {
    type: "Nuestra boda",
    hosts: ["Ana", "Luis"],
    date: "2027-12-04T17:00:00-06:00",
    timeZone: "America/Mexico_City",
    welcomeMessage: "Nos encantará compartir este día contigo.",
  },
  hero: {
    posterSrc: "/invitations/ana-luis/portada.jpg",
    eyebrow: "Nos casamos",
    phrase: "Nuestra historia continúa contigo.",
  },
  rsvp: {
    phone: "000000000000", // PERSONALIZAR: WhatsApp real con lada de país.
    message: "Confirmo mi asistencia. Mi nombre es:",
  },
};
```

Importa `anaLuis` en `src/config/examples.ts` y agrega `"ana-luis": anaLuis` al objeto `invitations`. Quedará disponible en `/invitaciones/ana-luis`. No dupliques páginas. Puedes renombrar este archivo de registro más adelante; hoy contiene tanto los ejemplos como las entradas de clientes.

Para ofrecerlo en el selector público de demostración, agrega su nombre a `EXAMPLE_LABELS` en el mismo archivo. La invitación de la raíz `/` usa `src/config/invitation.ts`.

## 2. Nombres, fecha y textos

Modifica `event.hosts`, `event.type`, `event.welcomeMessage`, `hero.eyebrow` y `hero.phrase`. Un solo nombre permite XV años o títulos empresariales.

`event.date` exige ISO 8601 con desplazamiento UTC explícito o Z. `event.timeZone` define la presentación local con una zona IANA. Deben corresponder al lugar y fecha reales. El contador compara instantes absolutos; después del evento muestra «¡Llegó el gran día!» sin valores negativos.

La historia opcional se define con `story: { title, text }` y se ofrece desde Esencial. `galleryTitle` cambia el título de las fotos.

## 3. Estilos centralizados

- `src/config/templates.ts`: paletas y estilos iniciales de las tres plantillas.
- `src/config/invitation.ts` o archivo del cliente: ajustes de una invitación.
- `src/lib/theme.ts`: conversión de tokens a variables CSS.
- `src/app/globals.css`: composiciones, ornamentos, responsive y animaciones.

```ts
theme: {
  primary: "#755c3e",
  accent: "#ac9164",
  background: "#faf7f0",
  foreground: "#40392f",
  surface: "#fffdf8",
  onPrimary: "#ffffff",
},
design: {
  headingFont: 'var(--font-pinyon), Georgia, serif',
  bodyFont: 'var(--font-cormorant), Georgia, serif',
  titleSize: "clamp(2.6rem, 5vw, 3.8rem)",
  sectionSpace: "4.5rem",
  radius: "1.5rem",
  buttonRadius: "999px",
  borderWidth: "1px",
  shadow: "0 12px 40px -24px #40392f55",
  animationDuration: "650ms",
  openingDuration: "1200ms",
  heroOverlay: 0.5,
  contentWidth: "1080px",
},
```

Los colores personalizados se habilitan desde Esencial; Express usa la paleta de la plantilla elegida. Los tokens `design` controlan el diseño técnico en todos los planes. Conserva contraste suficiente entre texto/fondo y botones. Las fuentes Cormorant y Pinyon ya se cargan mediante `next/font` en `src/app/layout.tsx`; usa fuentes del sistema o añade una fuente local allí si el proyecto lo necesita.

## 4. Fotos, video y música

Organiza medios en `public/invitations/<cliente>/` y usa rutas que comiencen en `/invitations/<cliente>/`, sin incluir `public`.

- `hero.posterSrc`: fotografía de portada o poster.
- `hero.videoSrc`: MP4 opcional en bucle, silenciado y compatible con reproducción inline.
- `gallery: [{ src, alt }]`: máximo cinco fotos renderizadas, con desplazamiento táctil nativo y botones.
- `audio: { src, title }`: música desde Signature; se inicia al abrir o pulsar reproducir.
- `accommodations[].imageSrc`: fotografía del hotel.

Usa MP4 H.264 sin pista de audio para el hero, imágenes comprimidas y archivos pequeños. No se incorpora un transcodificador. Las imágenes usan `next/image` con carga diferida, excepto la portada. Si falla un recurso, quedan el poster, la composición de color o una tarjeta de sustitución. Con movimiento reducido no se reproduce video.

Se prefieren archivos locales. Para imágenes externas hay que autorizar explícitamente el dominio en `images.remotePatterns` de `next.config.ts`. No pegues URLs de sitios sin disponer de licencia de uso. Las fotos de muestra en `public/images/demo` son imágenes generadas para ilustrar cada evento.

## 5. Plantillas

`template` admite `romantic-classic`, `modern-minimal` o `festive`. No cambia la lógica de planes. Romantic Classic usa detalles botánicos y caligrafía; Modern Minimal usa composición editorial, esquinas discretas y tipografía sobria; Festive utiliza curvas, estrellas y una paleta expresiva.

`opening` selecciona la portada: `"envelope"` (sobre con sello), `"ribbon"` (moño de seda), `"fireworks"` (fuegos artificiales), `"butterfly"` (mariposa) `"flowers"` (explosión de pétalos) o `"minimal"` (monograma). Por ejemplo, usa `opening: "ribbon"` en la configuración del cliente. También admite `true` para el sobre clásico y `false` para entrar directamente. En `/demo`, elige **Animación de apertura** y pulsa **Actualizar vista** para probarla. **Abrir esta invitación** conserva la selección en un enlace sin panel; no guarda cambios en la configuración del cliente. Horizonte utiliza la apertura minimalista por defecto. Si se omite, se usa el valor de la plantilla. `decorations` admite `botanical`, `geometric`, `stars` o `none`.

## 6. Planes

La configuración `plan` es la autoridad en las URLs públicas. `src/config/plans.ts` concentra precios, permisos, etiquetas y reglas.

| Plan | Precio MXN | Módulos adicionales |
| --- | ---: | --- |
| express | 390 | Hero, fecha/contador, WhatsApp |
| esencial | 690 | Ubicaciones, regalos/agradecimiento, datos bancarios, colores, historia opcional |
| signature | 1190 | Galería, vestimenta SVG, música y copiado de CLABE |
| elite | 1890 | Itinerario y hospedaje |

Los planes superiores incluyen los anteriores. La personalización del diseño Elite se hace con tokens, orden, decoraciones y datos; las revisiones ilimitadas son una condición comercial externa.

## 7. Activar y ocultar módulos

Cada módulo necesita permiso del plan y datos. Una lista ausente o vacía no deja huecos. Puedes quitar módulos permitidos:

```ts
hiddenSections: ["audio", "gallery", "giftRegistry"],
```

IDs disponibles: `hero`, `countdown`, `rsvp`, `customTheme`, `location`, `giftRegistry`, `story`, `audio`, `gallery`, `dressCode`, `smartCopyClabe`, `itinerary`, `accommodations`.

Quitar `smartCopyClabe` mantiene los datos como texto. Quitar `customTheme` vuelve a la paleta de la plantilla. Añadir un módulo a un plan inferior requiere cambiar `FEATURE_MIN_PLAN`; la configuración del cliente no eleva permisos.

## 8. Direcciones, regalos y WhatsApp

```ts
locations: [{
  label: "Recepción",
  venueName: "Jardín de ejemplo",
  address: "Dirección completa",
  lat: 19.4326,
  lng: -99.1332,
  time: "19:00 h",
}],
giftRegistry: {
  message: "Tu presencia es nuestro mejor regalo.",
  stores: [{ name: "Mesa de regalos", url: "https://example.com/regalos", eventCode: "DEMO" }],
  bankAccount: { bank: "Banco ficticio", holder: "Titular de ejemplo", clabe: "000000000000000000" },
},
```

Las coordenadas generan Google Maps y Waze. Comprueba que señalen la entrada correcta. El número de WhatsApp necesita lada internacional; el mensaje se codifica automáticamente. Los ceros son deliberadamente inválidos y nunca deben publicarse como contacto real.

Los enlaces de tiendas/reservas solo aceptan HTTP/HTTPS. CLABE usa Clipboard API y respaldo; si ambos fallan muestra instrucciones de selección manual. No se envían confirmaciones automáticamente: el invitado abre y envía su mensaje en WhatsApp.

## 9. Orden y composición

```ts
sectionOrder: ["hero", "countdown", "story", "location", "rsvp", "gallery"],
```

Las secciones no mencionadas se añaden al final en el orden de `DEFAULT_SECTION_ORDER` en `src/components/InvitationTemplate.tsx`. Los duplicados se eliminan. Para quitar una sección usa `hiddenSections`, no la omisión de `sectionOrder`. Música es flotante; apertura y pie permanecen fuera del orden.

El límite de escritorio es `design.contentWidth`. En móvil se usa todo el ancho disponible. Express reduce el alto del hero y el espaciado.

## 10. Animaciones y accesibilidad

`design.openingDuration` controla la apertura y `design.animationDuration` las transiciones. Usa duraciones CSS como `"900ms"`. El sello se desprende, la solapa gira y la tarjeta asciende. La animación usa transforms y la portada está en el flujo y permite seguir desplazándose. Se puede abrir con teclado, clic o toque.

Las animaciones y el video respetan `prefers-reduced-motion`. El contenido aparece sin JavaScript; los efectos de scroll son una mejora progresiva. Mantén etiquetas alternativas descriptivas en imágenes y evita textos demasiado extensos en botones.

## 11. Demostración

```sh
npm install
npm run dev
```

Abre `http://localhost:3000/demo` o `/`. Selecciona evento, plantilla, plan y vista, y pulsa **Actualizar vista**. La lista de módulos indica los permisos; solo se renderizan los que tienen datos.

Ejemplos directos:
- `/invitaciones/boda`
- `/invitaciones/quince`
- `/invitaciones/encuentro`

Pruebas rápidas:
- `/?plan=express&template=romantic-classic`
- `/?plan=esencial&template=modern-minimal`
- `/?plan=signature&template=festive`
- `/?plan=elite&example=boda`
- `/?plan=express&preview=1` muestra módulos bloqueados.

En producción, comparte `/demo` para comparar ejemplos. El catálogo público se limita a las claves de `EXAMPLE_LABELS`. La variable `BRAVI_DEMO_MODE` habilita también los controles en la raíz. Las rutas `/invitaciones/<slug>` siempre usan su configuración y no admiten cambios de plan por URL. Antes de publicar, elimina del registro los ejemplos que no quieras ofrecer.

La simulación de 390 px es una ayuda de composición; valida también dispositivos o emulación real. No equivale a Safari en un iPhone físico.

## 12. Verificación y mantenimiento

```sh
npm run typecheck
npm test
npm run build
```

No hay configuración ESLint heredada; no se agregó una dependencia solo para ejecutarlo.

Pruebas de navegador reproducibles en `tests/browser.cjs`, con servidor de desarrollo activo. Playwright es una herramienta temporal de validación y no una dependencia de la aplicación:
1. Ejecuta `npx --yes --package=@playwright/test playwright install chromium webkit`.
2. Define `PLAYWRIGHT_MODULE` con la ruta absoluta a `node_modules/playwright` de esa instalación temporal (o de una instalación existente).
3. Ejecuta `node tests/browser.cjs`. Opcional: `TEST_BASE_URL` cambia el servidor.
4. Las capturas se escriben en `artifacts/`, ignorado por Git.

El lockfile fija las versiones resueltas a partir de las dependencias originales. No se agregaron dependencias de producción.


### Pruebas de producción

Después de `npm run build`, inicia `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001` sin `BRAVI_DEMO_MODE`. Ejecuta `node tests/production.cjs` con `PLAYWRIGHT_MODULE` configurado. Verifica el selector público, parámetros ignorados en producción, ancho de 430 px, recursos inexistentes, reproducción pendiente y contenido accesible sin JavaScript. Usa 404 reales para medios porque WebKit puede reproducir mediante una capa nativa que no intercepta Playwright.

El color opcional `theme.secondary` controla detalles botánicos; si se omite hereda `accent`.
