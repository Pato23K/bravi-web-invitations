# BRAVI — Web Invitaciones (Project Context & Rules)

## 📌 Visión del Proyecto
BRAVI es una plataforma web modular de invitaciones digitales interactivas para eventos. El desarrollo sigue una arquitectura de Plantilla Maestra reutilizable y escalable, estructurada en 4 niveles de suscripción: Express, Esencial, Signature y Elite.

## 🛠️ Tech Stack & Herramientas
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript (modo estricto)
- **Estilos:** Tailwind CSS v4 + Variables CSS en `src/app/globals.css` para temas dinámicos
- **Control de Versiones:** Git & GitHub (flujo de trabajo por ramas)

## 📱 Reglas de Diseño y Arquitectura

### 1. Mobile-First Estricto
- Target principal: optimizado estrictamente para viewports móviles de 390px a 430px.
- Todos los layouts, botones e interacciones deben validarse primero en resoluciones de smartphones.

### 2. Estructura Modular por Planes (Herencia de Componentes)
- **Plan Express (Fase 1):** Hero Video 100vh (bucle continuo), Cuenta regresiva en JS y Botón RSVP con deep link a WhatsApp.
- **Plan Esencial (Fase 2):** Hereda Express + Deep links nativos a Google Maps/Waze, Mesa de regalos básica y variables CSS para cambio de paleta de colores.
- **Plan Signature (Fase 3):** Hereda Esencial + Reproductor de audio global, Carrusel táctil de fotos, Dress Code y Copiado inteligente de CLABE mediante Clipboard API.
- **Plan Elite (Fase 4):** Hereda Signature + Itinerario en línea de tiempo vertical y tarjetas desplazables con recomendaciones de hospedaje.

### 3. Restricciones Técnicas Obligatorias
- **Hero Video:** Debe ocupar 100vh con atributos obligatorios `autoPlay`, `muted`, `loop`, `playsInline` y una capa overlay oscura para garantizar el contraste de los textos.
- **Audio Global:** Debido al bloqueo de autoplay con sonido en navegadores móviles, el audio debe iniciarse mediante un botón flotante de reproducción o con el primer tap del usuario.
- **Deep Links Móviles:** Los botones de ubicación y RSVP deben activar las aplicaciones nativas (WhatsApp, Waze, Google Maps).
- **Copiado de CLABE:** Implementar la API nativa `navigator.clipboard.writeText` acompañada de un aviso de confirmación (Toast).

## 💬 Convenciones de Código
- Utilizar React Server Components (RSC) por defecto; limitar `'use client'` a componentes interactivos con estado o eventos del navegador (Audio Player, Contador, Copiar CLABE, Carrusel y la Portada).
- No exportar utilidades desde archivos `'use client'` si las usa un Server Component: van en `src/lib/`.
- Definir interfaces de TypeScript explícitas para las props de cada componente.
- Mapear la paleta de colores a variables CSS (`--primary`, `--accent`, `--background`, `--foreground`, `--surface`, `--on-primary`) para permitir la tematización por evento.

## 🗂️ Estructura del Código (Plantilla Maestra)

```
src/
  app/
    layout.tsx            # Fuentes (Cormorant Garamond + Pinyon Script) y metadatos
    page.tsx              # Vista principal; modo demo con ?plan= y ?preview=1
    globals.css           # Tailwind v4 + variables CSS del tema
  config/
    plans.ts              # Planes, apartado → plan mínimo, lógica de bloqueo
    invitation.ts         # Datos del evento (ejemplo Elite con todo lleno)
  types/invitation.ts     # Interfaces de la configuración
  lib/                    # deep-links, fechas, tema, CLABE, modo demo
  components/
    InvitationTemplate.tsx  # Ensambla todos los apartados con <PlanGate>
    common/               # PlanGate, LockedSection, PlanSwitcher, CoverIntro, Toast, íconos
    express/              # HeroVideo, EventCountdown, RsvpButton
    esencial/             # LocationMaps, BasicGiftRegistry
    signature/            # GlobalAudioPlayer, PhotoGallery, DressCode, SmartCopyClabe
    elite/                # EventItineraryTimeline, AccommodationCards
```

### Sistema de planes (cómo se bloquean los apartados)
- La plantilla siempre contiene todo el plan Elite. Cada apartado se envuelve en `<PlanGate feature="...">` dentro de `InvitationTemplate.tsx`.
- `FEATURE_MIN_PLAN` en `src/config/plans.ts` define el plan mínimo de cada apartado. Para mover un apartado de plan solo se cambia ahí.
- Resultado por apartado: incluido en el plan → se muestra; fuera del plan → no se renderiza; fuera del plan en vista previa (`?preview=1`) → se muestra difuminado con candado y "Disponible en plan X".
- `hiddenSections` en la configuración del evento oculta apartados puntuales aunque el plan los incluya.
- El modo demo (`?plan=` / `?preview=1`) solo funciona en `npm run dev` o con `BRAVI_DEMO_MODE=true`; en producción el plan sale únicamente de la configuración.

### Agregar un apartado nuevo
1. Crear el componente en la carpeta del plan (`src/components/<plan>/`).
2. Agregar su id en `FEATURE_MIN_PLAN` y `FEATURE_LABELS` (`src/config/plans.ts`).
3. Agregar sus datos a `InvitationConfig` (`src/types/invitation.ts`) y a `src/config/invitation.ts`.
4. Insertarlo en `InvitationTemplate.tsx` envuelto en `<PlanGate>`.

## ✅ Protocolo de Verificación
1. `npm run typecheck` (equivale a `npx tsc --noEmit`) sin errores.
2. Solo los componentes interactivos llevan `'use client'`.
3. Inspección con Playwright MCP en 390×844 y 412×915 sin scroll horizontal, revisando cada plan con `?plan=` y `?preview=1`.
