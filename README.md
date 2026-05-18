# Lapierre Híbrida Carbono | Landing Page

Landing page desarrollada con **Next.js 16**, orientada puramente a la optimización de asets, el alto rendimiento visual ("scrollytelling") y una experiencia de usuario extremadamente premium.

El proyecto es un punto de venta interactivo ("one-page sale") para una bicicleta Lapierre Híbrida. 

## 🚀 Tecnologías Principales
- **Framework**: Next.js 16 (App Router) y React 19.
- **Styling**: Tailwind CSS 4.
- **Animaciones**: Framer Motion y API nativa de Canvas HWA (Hardware Accelerated).
- **Testing**: Vitest + React Testing Library (Strict TDD Mode habilitado).

## 📦 Instrucciones de Instalación

1. Clona el repositorio a tu máquina local.
2. Instala las dependencias:
   ```bash
   npm install
   ```

### ⚠️ Pre-requisito Crítico: El Manifest
La animación principal usa *scrollytelling* con más de 100 imágenes (`/frames/`). Para evitar indexar o hardcodear urls en código, el proyecto tiene un script que genera dinámicamente un `manifest.json`.

`public/frames/manifest.json` es un artefacto **generado** (no versionado) y se reconstruye automáticamente en los flujos soportados.

### ✅ Flujos soportados (obligatorios)

Usá siempre estos comandos:

```bash
npm run dev
npm run build
```

Ambos ejecutan `predev` / `prebuild` antes de correr Next, garantizando que el manifest exista antes del consumo runtime.

### ⚠️ Riesgo de bypass y recuperación

Si corrés `next dev` directo (sin `npm run dev`), podés bypasséar la generación y dejar el manifest ausente.

Recovery path:

```bash
npm run predev
```

Luego continuá con `npm run dev`.

### Entorno de Desarrollo
```bash
npm run dev
```

### Builds
```bash
npm run build
npm start
```

## 📖 Documentación Adicional
Para entender las normativas, diseño de software y calidad de esta aplicación, consultá nuestra documentación extendida:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Por qué tomamos las decisiones de performance visuales que tomamos.
- [TESTING.md](./TESTING.md) - Cómo funciona nuestra suite de Vitest y las reglas de diseño impulsado por testing.
- `AGENTS.md` / `CLAUDE.md` - Convenciones fundamentales para modelos AI que interactúen con el código.
