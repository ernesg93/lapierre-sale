# Project Review — Lapierre Sale

Fecha: 2026-04-23

## 1. Resumen ejecutivo

`lapierre-sale` es una **landing one-page de venta directa** para una bicicleta Lapierre, con enfoque en:

- experiencia visual premium
- scrollytelling con canvas
- generación de confianza para venta entre particulares
- conversión vía WhatsApp

La base es buena: la app está clara, componentizada y con intención arquitectónica. Pero hoy existen **desalineaciones reales** entre implementación, specs, documentación y estado de calidad.

---

## 2. Stack y estructura observada

### Stack verificado en `package.json`

- Next.js `16.2.4`
- React `19.2.4`
- Tailwind CSS `4`
- Framer Motion
- Vitest + React Testing Library
- TypeScript

### Estructura principal

- `app/`
  - `page.tsx` compone la landing.
  - `layout.tsx` centraliza metadata SEO/OG usando `siteConfig`.
- `components/`
  - `CameraScroll.tsx`
  - `StickyHeader.tsx`
  - `PurchaseConfig.tsx`
  - `TechSpecs.tsx`
  - `TrustSection.tsx`
  - `FAQ.tsx`
  - `Footer.tsx`
- `hooks/`
  - `useActiveSection.ts`
- `src/config/`
  - `site.ts`
- `public/frames/`
  - secuencia de imágenes + `manifest.json`
- `scripts/`
  - generación de manifest y conversión de imágenes
- `openspec/`
  - specs vivas + archivos históricos archivados

---

## 3. Contexto de negocio y flujo actual de venta

### Producto / propuesta

Se vende una bicicleta Lapierre usada mediante una landing orientada a storytelling visual y confianza.

### Funnel actual

1. **Hero scrollytelling**
   - secuencia visual de la bici en canvas
   - overlays que comunican valor y estado
2. **Sticky header**
   - navegación interna
   - indicador de scroll
   - CTA contextual
3. **PurchaseConfig**
   - opciones de entrega/pack
4. **TechSpecs**
   - ficha técnica
5. **TrustSection**
   - garantías de confianza para venta particular
6. **FAQ**
   - objeciones comunes
7. **Footer**
   - CTA de cierre por WhatsApp

### Modelo de conversión

No hay checkout ni backend comercial. El flujo es:

**visita → confianza → WhatsApp → cierre offline**

Eso es coherente con una venta unitaria de alto valor relativo.

---

## 4. Hallazgos técnicos verificados

## 4.1 Bug funcional: el header navega a FAQ pero FAQ no tiene `id`

### Evidencia

- `components/StickyHeader.tsx` define link con `id: "faq"`.
- `components/FAQ.tsx` renderiza `<section ...>` **sin** `id="faq"`.

### Impacto

El botón/link “Preguntas” del header no puede garantizar navegación correcta hacia la sección FAQ.

### Severidad

Baja a media, pero es un bug real de contrato UI.

---

## 4.2 Centralización de config incompleta

### Evidencia

`src/config/site.ts` centraliza:

- `whatsappNumber`
- `price`
- `whatsappMessage`
- metadata del sitio

Pero estos componentes siguen hardcodeando el número de WhatsApp:

- `components/PurchaseConfig.tsx`
- `components/Footer.tsx`

### Impacto

Se rompe el principio de **single source of truth** y aumenta riesgo de inconsistencias futuras.

---

## 4.3 API engañosa en `useActiveSection`

### Evidencia

La firma del hook acepta:

```ts
useActiveSection(sectionIds: string[], threshold = 0.5)
```

Pero el parámetro `threshold` no controla realmente el `IntersectionObserver`, porque dentro se usa un array fijo:

```ts
threshold: [0, 0.25, 0.5, 0.75, 1.0]
```

### Impacto

La API promete configurabilidad que la implementación no cumple. Esto es deuda de diseño y puede inducir a error en mantenimiento.

---

## 4.4 La documentación describe una arquitectura más limpia que el código real

### Evidencia

`ARCHITECTURE.md` afirma centralización estructural de puntos calientes como WhatsApp.

Pero la implementación actual todavía duplica ese dato en componentes.

### Impacto

Hay desalineación entre narrativa arquitectónica y estado real del repo.

---

## 4.5 Estado de calidad actual: tests verdes, lint rojo

### Comandos ejecutados

#### Tests

```bash
npm run test:run
```

Resultado observado:

- **9 archivos de test OK**
- **32 tests OK**

#### Lint

```bash
npm run lint
```

Resultado observado:

- errores por `@typescript-eslint/no-explicit-any` en varios tests
- warnings por imports/variables sin uso

### Problemas concretos detectados por lint

- `components/__tests__/CameraScroll.test.tsx`
  - `any` explícitos
- `components/__tests__/StickyHeader.test.tsx`
  - varios `any` explícitos
- `hooks/__tests__/useActiveSection.test.ts`
  - `any` explícitos
- `components/CameraScroll.tsx`
  - `framesUrls` asignado pero no usado
- `components/StickyHeader.tsx`
  - `AnimatePresence` importado pero no usado
- `hooks/useActiveSection.ts`
  - `observers` asignado pero no usado

### Conclusión

La suite de tests funciona, pero la señal global de calidad no está completamente sana.

---

## 4.6 El verify report archivado ya no refleja el estado actual del repo

### Evidencia

`openspec/changes/archive/premium-header-enhancement/verify-report.md` declara:

- tests OK
- linter OK
- type checker OK

Pero al momento de esta revisión:

- tests OK
- **lint falla**

### Interpretación correcta

No necesariamente implica que el reporte histórico sea falso. Implica que **el estado actual del repo ya no coincide completamente con ese artefacto archivado**.

---

## 4.7 Higiene de repositorio mejorable

### Evidencia

`git ls-files` mostró que existe un archivo trackeado:

- `Nuevo documento de texto.txt`

### Impacto

No rompe producción, pero es una mala señal de limpieza del repositorio.

---

## 5. Evaluación de arquitectura

## Lo bueno

- composición clara en `app/page.tsx`
- metadata centralizada en `app/layout.tsx`
- esfuerzo real por separar comportamiento por secciones
- estrategia razonable de performance en `CameraScroll.tsx`
- OpenSpec presente con historial de cambios
- cultura de testing existente

## Lo flojo

- contenido comercial disperso
- algunas fuentes de verdad duplicadas
- documentación parcialmente desalineada
- hooks/tests con deuda de tipado y limpieza
- verify reports históricos no deben asumirse como reflejo del presente

---

## 6. Historial Git relevante observado

### Rama

- `feat/testing-and-dev`

### Secuencia reciente más importante

1. `feat(header): implement premium enhancements and dynamic cta following TDD`
2. `feat(mobile): implement sticky header and responsive canvas offset for scrollytelling`
3. `refactor: update Vitest configuration and migrate to jest-dom/vitest matchers`
4. `test: complete footer tests and finalize test suite`
5. `test: add complex unit tests for CameraScroll and fix TS linting`
6. `test: add unit tests for FAQ, TechSpecs, and TrustSection and initialize SDD`

### Lectura arquitectónica

La evolución reciente priorizó:

- UX premium
- mobile refinement
- sticky header
- test coverage
- formalización SDD

Es una dirección correcta, pero ahora hace falta una fase de **consistencia y saneamiento**.

---

## 7. Restricciones y convenciones a respetar al retomar

- No correr build después de cambios.
- Verificar afirmaciones técnicas antes de darlas por válidas.
- El repo usa SDD con `strict_tdd: true` en `openspec/config.yaml`.
- No mezclar bugfix, refactor de dominio, calidad y docs en un solo cambio gigante.

---

## 8. Recomendación de alto nivel

No hacer “todo” en un único cambio. La recomendación es dividir el trabajo en cambios SDD pequeños y secuenciales.

Ver plan detallado en:

- `ai-handoff/SDD_MASTER_PLAN_2026-04-23.md`
