# BRAVI — Web Invitations

A modern, modular, and mobile-first web invitation platform built with **Next.js and TypeScript**.

## Overview

BRAVI Web Invitations is a web development project focused on creating elegant, interactive, and customizable digital invitations for special events.

The platform follows a modular architecture, allowing different components and features to be enabled or disabled depending on the selected invitation plan.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Version Control:** Git & GitHub

## Features

The project is organized into four invitation plans:

### Express
- Full-screen video hero
- Event information
- Live countdown timer
- WhatsApp RSVP integration

### Esencial
Includes Express features, plus:
- Event locations
- Google Maps and Waze integration
- Basic gift registry

### Signature
Includes Esencial features, plus:
- Background music player
- Interactive photo gallery
- Dress code information
- Copy-to-clipboard functionality

### Elite
Includes Signature features, plus:
- Custom event timeline
- Accommodation recommendations
- Additional customizable sections

## Architecture

The project will follow a component-based architecture designed for:

- Reusability
- Maintainability
- Scalability
- Mobile-first responsive design
- Customizable themes and layouts
- Feature-based invitation plans

## Development Status

**Status:** Master Template base (Elite plan) in place

All 10 modular components are implemented inside a single Master Template. Each section is gated by plan, so lower plans hide (or, in preview mode, lock) the sections they don't include. Sample media in `public/` are placeholders to be replaced per event.

## Getting Started

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. In development you can switch plans from the demo bar at the top, or with the URL:

| URL | Result |
| --- | --- |
| `/?plan=express` | Only Express sections |
| `/?plan=esencial` | Express + Esencial |
| `/?plan=signature` | Esencial + Signature |
| `/?plan=elite` | Everything |
| `/?plan=express&preview=1` | Express, with locked previews of the sections from higher plans |

Other scripts: `npm run typecheck`, `npm run build`, `npm start`.

### Where to change things

- **Event data and contracted plan:** `src/config/invitation.ts`
- **Which plan includes each section:** `FEATURE_MIN_PLAN` in `src/config/plans.ts`
- **Section order:** `src/components/InvitationTemplate.tsx`
- **Default color palette:** `src/app/globals.css` and `src/lib/theme.ts`
- **Media:** `public/media` (hero video, music) and `public/images` (gallery, hotels)

Demo mode (`?plan=` / `?preview=1`) is always on in `npm run dev`. In production it is only enabled with `BRAVI_DEMO_MODE=true` (see `.env.example`), so guests can't unlock sections by editing the URL.

See `CLAUDE.md` for the full architecture and coding rules.

## License

Proprietary project. All rights reserved.

Developed for BRAVI.

## Plantillas y personalización

La plantilla maestra ahora ofrece **Romantic Classic**, **Modern Minimal** y **Festive**, con los mismos módulos funcionales y permisos por plan.

- Estudio de pruebas: `/demo` permite comparar los ejemplos en desarrollo y producción.
- Ejemplos públicos: `/invitaciones/boda`, `/invitaciones/quince`, `/invitaciones/encuentro`.
- Registro de invitaciones: `src/config/examples.ts`.
- Estilos de plantilla: `src/config/templates.ts`.
- Orden y ocultamiento: `sectionOrder` y `hiddenSections` en la configuración del cliente.
- Guía completa en español: [CUSTOMIZATION.md](CUSTOMIZATION.md).
- Pruebas: `npm test`, `npm run typecheck`, `npm run build`; navegador: `tests/browser.cjs`.

Las imágenes ilustrativas están en `public/images/demo`. El RSVP de muestra permite consultar el mensaje y la cuenta bancaria está identificada como ficticia. Se deben sustituir antes de entregar una invitación a un cliente.
