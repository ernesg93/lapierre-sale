## Exploration: generated-assets-governance

### Current State
- `public/frames/manifest.json` es un artefacto generado por `scripts/build-frames-manifest.mjs` y se ejecuta automáticamente en `predev` y `prebuild` (`package.json`).
- El runtime depende del manifest: `components/CameraScroll.tsx` hace `fetch('/frames/manifest.json')` al montar; si falta, muestra fallback de error.
- Hoy el manifest está **versionado** (`git ls-files` lo incluye) y también existe una regla de ignore en `.gitignore`; esa regla no está funcionando (no hace match).
- Ya hubo ruido histórico por este archivo fuera de scope (`openspec/changes/archive/2026-04-26-landing-consistency-fixes/verify-report.md`).
- Según docs de Next.js 16 (`node_modules/next/dist/docs/.../public-folder.md`), archivos en `public/` tienen cache por defecto `max-age=0` (tratados como mutables), por lo que un manifest regenerable encaja como artefacto mutable de build/dev.

### Affected Areas
- `.gitignore` — define (hoy de forma inválida) la política de tracking/ignore del manifest.
- `public/frames/manifest.json` — artefacto generado que hoy está trackeado y mete churn en cambios no relacionados.
- `scripts/build-frames-manifest.mjs` — fuente de verdad para generar el manifest.
- `package.json` — asegura generación en `predev`/`prebuild` para no romper dev/build al desversionar el manifest.
- `components/CameraScroll.tsx` — consumidor runtime del manifest; cualquier política debe garantizar existencia del archivo antes de servir app.
- `README.md` — ya documenta prerequisito del manifest; debería alinearse con la política final para contributors.

### Approaches
1. **Mantener manifest versionado y corregir disciplina de commits** — dejar `manifest.json` trackeado y exigir revert/manual staging cuando quede fuera de scope.
   - Pros: cero cambio en flujo actual; siempre visible en diffs cuando cambian frames.
   - Cons: mantiene ruido operativo; requiere enforcement humano constante; ya mostró fricción en verificación previa.
   - Effort: Low.

2. **Desversionar manifest y regenerarlo siempre en dev/build (recomendado)** — remover tracking de `public/frames/manifest.json`, corregir `.gitignore` para ignorarlo efectivamente, y sostener generación automática en scripts existentes.
   - Pros: elimina churn de commits fuera de scope; preserva funcionamiento porque `predev`/`prebuild` ya lo generan; política coherente con “artefacto generado”.
   - Cons: quien ejecute `next dev` directo (sin `npm run dev`) puede no tener manifest al inicio; requiere documentación explícita del flujo correcto.
   - Effort: Low.

3. **Eliminar manifest y listar frames en runtime** — reemplazar contrato por endpoint/server-side listing o convención de nombres fijos.
   - Pros: reduce un archivo generado en repo.
   - Cons: aumenta complejidad/latencia, toca arquitectura de scrollytelling, y es innecesario para resolver solo gobernanza de artefactos.
   - Effort: Medium/High.

### Recommendation
Recomiendo **Approach 2**: tratar `public/frames/manifest.json` como artefacto generado no versionado. Es la estrategia mínima que reduce ruido de commits sin romper dev/build porque el proyecto ya ejecuta `build-frames-manifest` en `predev` y `prebuild`. Complementar con una regla de ignore correcta y una nota operativa clara (usar `npm run dev`/`npm run build`, no bypass del pre-script).

### Risks
- Si alguien saltea scripts (`next dev` directo), verá fallback por manifest faltante hasta regenerarlo.
- Si se ignora el manifest sin destrackearlo correctamente, seguirá apareciendo en diffs (falsa sensación de gobernanza resuelta).
- Si en el futuro se mueve la generación fuera de `predev/prebuild`, puede romperse el contrato runtime de `CameraScroll`.

### Ready for Proposal
Yes — hay evidencia de dependencia runtime, causa concreta del ruido (tracking + ignore inválido), alternativas comparadas y una estrategia mínima de bajo riesgo para pasar a `sdd-propose`.
