## Exploration: landing-consistency-fixes

### Current State
- `StickyHeader` navega a `#faq` (`components/StickyHeader.tsx`), pero `FAQ` no expone `id="faq"` (`components/FAQ.tsx`), por lo que la navegación puede fallar en ese destino.
- La configuración centralizada ya existe en `src/config/site.ts` (`siteConfig`, `whatsappUrl`), y se usa correctamente en `StickyHeader` y `CameraScroll`.
- `Footer` y `PurchaseConfig` siguen hardcodeando `WHATSAPP_NUMBER` y construyen URLs por su cuenta, rompiendo single source of truth.
- Hay churn activo en `package-lock.json` sin cambios de `package.json` (`git status` muestra lockfile modificado). El diff muestra ruido de metadatos (`peer`, `libc`, entradas opcionales), consistente con regeneración por diferencias de npm/entorno o instalaciones transitorias.

### Affected Areas
- `components/FAQ.tsx` — sección FAQ sin `id` navegable para `#faq`.
- `components/StickyHeader.tsx` — origen del enlace `Preguntas` hacia `faq`.
- `components/Footer.tsx` — hardcode de WhatsApp y construcción manual de links.
- `components/PurchaseConfig.tsx` — hardcode de WhatsApp y construcción manual de links con mensajes dinámicos.
- `src/config/site.ts` — fuente de verdad candidata para WhatsApp (número + URL base/mensaje).
- `components/__tests__/FAQ.test.tsx` — cobertura de comportamiento FAQ; no valida contrato de anchor/id.
- `components/__tests__/Footer.test.tsx` — tests acoplados al número hardcodeado actual.
- `components/__tests__/PurchaseConfig.test.tsx` — tests acoplados al número hardcodeado actual.
- `scripts/convert-to-webp.mjs` — ejecuta `npm install sharp --no-save`, potencial fuente de lockfile churn.
- `package-lock.json` — actualmente modificado; requiere política explícita para evitar ruido.

### Approaches
1. **Fix mínimo de consistencia + política de lockfile liviana** — ajustar anchor FAQ, centralizar WhatsApp en componentes con hardcode y documentar criterio de commit/no-commit para lockfile.
   - Pros: riesgo bajo, cambio chico, alinea UI + arquitectura + tests con costo acotado.
   - Cons: no elimina de raíz todas las fuentes potenciales de churn (solo define guardrails).
   - Effort: Low.

2. **Normalización ampliada de configuración comercial** — además de lo anterior, introducir helpers/config para generación uniforme de URLs de WhatsApp (mensaje opcional), y adaptar specs/tests para depender de config central en vez de literals.
   - Pros: reduce deuda estructural y desalineación futura, mejora mantenibilidad.
   - Cons: toca más superficie (tests + contrato de config), mayor coordinación en fases siguientes.
   - Effort: Medium.

### Recommendation
Recomiendo **Approach 1** para este cambio porque cumple el objetivo de “primer cambio pequeño y seguro”: corrige el bug funcional de navegación FAQ, elimina la duplicación más crítica de WhatsApp y establece una política operativa de `package-lock.json` que reduzca ruido sin sobre-extender el alcance.

Criterio recomendado para `package-lock.json`:
- **Se versiona siempre** en el repositorio (fuente reproducible para `npm ci`).
- **Se acepta en commits solo cuando hay intención explícita de cambio de dependencias** (modificaciones en `package.json`, upgrade/dependency ops planificadas).
- **Si cambia sin tocar dependencias, se trata como churn**: revertir antes de merge.
- **Mitigación sugerida**: evitar instalaciones transitorias que toquen lockfile (ej. ajustar scripts utilitarios para no reescribir lock o preinstalar herramientas en flujo controlado).

### Risks
- Tests actuales están acoplados al literal `5356793586`; al centralizar pueden requerir ajuste para validar contra config en vez de hardcode.
- Si se redefine mal la API de URLs de WhatsApp, puede romperse el formato de mensajes prellenados en CTAs.
- Cambios en política de lockfile sin disciplina de equipo pueden generar fricción en PRs (ruido recurrente).

### Ready for Proposal
Yes — hay evidencia suficiente para pasar a `sdd-propose` con alcance acotado, exclusiones claras y criterio operativo para lockfile.

### Scope (In)
- Corregir contrato de navegación hacia FAQ (`#faq` ↔ sección destino).
- Unificar origen de número/URL de WhatsApp en `Footer` y `PurchaseConfig` usando config central.
- Definir y documentar criterio de manejo de churn de `package-lock.json` para este repo.

### Exclusions (Out)
- No rediseñar UX ni copy de CTAs/comercial.
- No cambios de arquitectura fuera de FAQ + WhatsApp consistency.
- No upgrades de dependencias ni limpieza masiva del lockfile en esta fase.

### Open Decisions
- Definir si `site.ts` expone solo `whatsappUrl` fijo o también helper para mensajes dinámicos (p.ej. opción de compra).
- Definir dónde documentar formalmente la política lockfile (README vs AGENTS vs OpenSpec artifact de propuesta/especificación).
- Definir si se corrige en este cambio la instalación transitoria de `sharp` para evitar churn futuro o se difiere a otro change.
