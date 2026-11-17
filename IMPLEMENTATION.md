# Entrega de la plantilla maestra

## Base reutilizada

Se inspeccionaron los archivos de `src/`, configuración, dependencias y medios disponibles, con el grafo codebase-memory y lectura directa. La aplicación ya tenía Next.js App Router, React, TypeScript estricto, Tailwind v4, permisos progresivos y los diez módulos principales. Se conservaron esas tecnologías y los componentes funcionales.

Se reutilizan: `PlanGate`, `LockedSection`, `SectionHeading`, `Toast`, los iconos SVG, `EventCountdown`, `RsvpButton`, `LocationMaps`, `BasicGiftRegistry`, `PhotoGallery`, `DressCode`, `SmartCopyClabe`, `GlobalAudioPlayer`, `EventItineraryTimeline` y `AccommodationCards`. Hero, portada y ensamblador evolucionan sobre sus archivos originales.

## Archivos creados

- `src/config/templates.ts`: identidades Romantic Classic, Modern Minimal y Festive.
- `src/config/examples.ts`: boda, XV años y encuentro empresarial; registro por slug.
- `src/components/DemoPage.tsx`: resolución de evento, plantilla, plan y ancho.
- `src/components/common/ScrollReveal.tsx`: apariciones progresivas.
- `src/components/common/SafeImage.tsx`: imágenes con sustitución visual.
- `src/components/express/HeroMedia.tsx`: video opcional y poster.
- `src/app/demo/page.tsx`: estudio de desarrollo.
- `src/app/invitaciones/[slug]/page.tsx`: invitaciones públicas con metadatos propios.
- `tests/core.cjs`, `tests/browser.cjs`, `tests/production.cjs`: regresiones de utilidades, navegador y producción.
- `CUSTOMIZATION.md`: guía en español con ejemplos reales.
- `IMPLEMENTATION.md`: este inventario y resultados.
- `package-lock.json`: versiones reproducibles de las dependencias originales.
- `AGENTS.md`: reglas generadas por Next.js y la instrucción codebase-memory proporcionada.

## Archivos modificados

- `src/types/invitation.ts`: tipos de plantilla, tokens, orden y campos opcionales.
- `src/config/invitation.ts`: personalización comentada y datos ficticios seguros.
- `src/config/plans.ts`: precios e historia opcional.
- `src/lib/theme.ts`, `date.ts`, `deep-links.ts`: variables, validación de fechas y enlaces seguros.
- `src/app/globals.css`, `layout.tsx`, `page.tsx`: estilos, metadatos y entrada de demostración.
- `src/components/InvitationTemplate.tsx`: composición por datos, orden y permisos.
- `src/components/common/CoverIntro.tsx`, `PlanSwitcher.tsx`: apertura sin bloquear scroll y selector.
- `src/components/express/HeroVideo.tsx`: imagen/video, frase y overlay.
- `src/components/esencial/BasicGiftRegistry.tsx`: protocolos externos permitidos.
- `src/components/elite/AccommodationCards.tsx`: sustitución de imágenes y enlaces.
- `src/components/signature/GlobalAudioPlayer.tsx`, `PhotoGallery.tsx`, `SmartCopyClabe.tsx`: fallos multimedia, tiempo de espera, movimiento reducido, botones accesibles y copia manual de respaldo.
- `README.md`, `package.json`, `.gitignore`: guía, script de pruebas y exclusión de capturas.

## Funcionalidades

Tres plantillas comparten un único ensamblador y permisos para Express $390, Esencial $690, Signature $1,190 y Elite $1,890 MXN. Las secciones requieren permiso y datos; pueden ocultarse y reordenarse por configuración. Se incluyen portada interactiva opcional, hero con fallback, contador, WhatsApp, ubicaciones, regalos, historia, cinco fotografías, vestimenta SVG, audio por interacción, CLABE con aviso, itinerario y hospedaje.

Estilos centralizados en `src/config/templates.ts`, `design/theme` del cliente y variables de `src/lib/theme.ts`; composiciones en `src/app/globals.css`. Para un cliente nuevo basta crear una configuración tipada y registrarla en `src/config/examples.ts`; la URL se genera como `/invitaciones/<clave>`.

## Validación ejecutada

- `npm run typecheck`: correcto.
- `npm test`: cuatro pruebas de reglas de planes, enlaces, fechas y permisos de producción.
- `npm run build`: correcto con Next.js 16.4.6 resuelto desde la dependencia original.
- `tests/browser.cjs`: 72 combinaciones (3 plantillas × 4 planes × 3 anchos: 390/412/1440 × Chromium/WebKit). Sin excepciones de cliente ni desbordamiento horizontal.
- Interacciones: apertura por teclado, foco posterior, audio inicialmente pausado, galería, portapapeles denegado y exitoso, evento vencido, selector, módulos sin datos y fotografías fallidas.
- `tests/production.cjs`: ambos motores; ancho de 430 px, demo 404, parámetros sin efecto sobre plan/plantilla públicos, medios con 404, promesa de reproducción pendiente y contenido sin JavaScript.
- Movimiento reducido: sin video y apertura inmediata; capturas revisadas de portada, detalle móvil y hero de escritorio.
- `git diff --check`: correcto.
- ESLint no estaba configurado; no se incorporó una dependencia para aparentar una comprobación existente.

Las capturas locales están en `artifacts/` (ignorado por Git). Las pruebas de navegador usan Playwright temporal, sin añadir dependencias a la aplicación.

## Límites de la entrega

Los medios heredados contienen marcadores «REEMPLAZAR». El video y PDF de referencia no llegaron: el documento adjunto tenía rutas sin completar. Se implementó la descripción textual y se conservaron los recursos disponibles. Antes de publicar un evento real deben sustituirse fotografías, video, música, contactos, ubicaciones y datos bancarios por contenido autorizado del cliente.

Chromium y WebKit se probaron en Windows con tamaños móviles; no equivale a pruebas en Safari iOS y Chrome Android sobre teléfonos físicos. Esa comprobación queda pendiente de disponer de dispositivos.

No se añadieron pagos, autenticación, base de datos ni panel administrativo. La personalización comercial se hace mediante configuración y CSS. No se publicó ni desplegó el sitio.

