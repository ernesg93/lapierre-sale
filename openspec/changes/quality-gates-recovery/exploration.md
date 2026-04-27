## Exploration: quality-gates-recovery

### Current State
- `npm run lint` falla con **12 errores** (`@typescript-eslint/no-explicit-any`) concentrados en tests; además hay **3 warnings** por imports/variables sin uso en runtime (`components/CameraScroll.tsx`, `components/StickyHeader.tsx`, `hooks/useActiveSection.ts`).
- `npx tsc --noEmit` falla en `components/__tests__/CameraScroll.test.tsx` por tipado incorrecto del mock de `useTransform` de Framer Motion: la firma inyectada en test no coincide con los overloads tipados de `framer-motion@12`.
- La configuración de calidad es estricta y consistente con OpenSpec (`openspec/config.yaml`): quality tools definidos como `npm run lint` y `npx tsc --noEmit`, con `strict_tdd: true`.
- No hay cambios locales en working tree (`git status --short` limpio), por lo que la recuperación de gates puede acotarse sin mezclar producto/contenido si se restringe a tests + hygiene mínimo de lint.

### Affected Areas
- `components/__tests__/StickyHeader.test.tsx` — mayor concentración de `any` explícitos (mocks de `motion.*`, `AnimatePresence`, `useTransform`, y cast de `useScroll`).
- `components/__tests__/CameraScroll.test.tsx` — `any` explícito + mockImplementation de `useTransform` incompatible con tipos actuales.
- `hooks/__tests__/useActiveSection.test.ts` — `any` explícito en callback de `IntersectionObserver`.
- `components/CameraScroll.tsx` — warning por `framesUrls` sin uso.
- `components/StickyHeader.tsx` — warning por `AnimatePresence` importado y no usado.
- `hooks/useActiveSection.ts` — warning por `observers` declarado y no usado.
- `eslint.config.mjs` — confirma que no hay excepción actual para `no-explicit-any` en tests.
- `tsconfig.json` / `tsconfig.test.json` — confirman tipado estricto y que tests están dentro del universo TypeScript de validación.
- `node_modules/framer-motion/dist/types/index.d.ts` — overloads de `useTransform` explican el error de compatibilidad de la firma mockeada.

### Approaches
1. **Corrección estricta en tests (sin relajar reglas)** — tipar correctamente mocks/utilidades de test y eliminar `any` explícitos, ajustando la forma de mock de `useTransform` para alinearla con overloads reales.
   - Pros: mantiene el estándar de calidad intacto; evita deuda de configuración; no toca producto/copy.
   - Cons: requiere trabajo de tipado en varios tests y un mock más cuidadoso de Framer Motion.
   - Effort: Medium.

2. **Relajar quality gates solo para tests** — agregar overrides en ESLint/TS para permitir `any` en `*.test.*` o excluir tests del typecheck principal.
   - Pros: recuperación rápida de verde inicial.
   - Cons: baja el estándar; puede ocultar errores reales; contradice intención de `strict_tdd` y genera deuda de rollback.
   - Effort: Low.

3. **Híbrido controlado** — corrección estricta en tests para errores bloqueantes + limpieza de warnings de runtime no relacionados con comportamiento.
   - Pros: gates verdes sin bajar barra, menor ruido futuro de lint, alcance técnico acotado.
   - Cons: pequeño aumento de superficie respecto al enfoque 1 (incluye hygiene en archivos runtime).
   - Effort: Medium.

### Recommendation
Recomiendo **Approach 3 (Híbrido controlado)**: recuperar gates corrigiendo tipado de tests (bloqueantes reales) y, en el mismo change técnico, limpiar los 3 warnings de variables/imports no usados para dejar un baseline estable. Esto mantiene calidad estricta, evita mezclar contenido/producto y reduce la probabilidad de regresión en PRs siguientes.

### Scope (In)
- Eliminar `no-explicit-any` en tests afectados (`StickyHeader`, `CameraScroll`, `useActiveSection`) con tipos concretos o utilitarios de test tipados.
- Corregir mock de `useTransform` en `CameraScroll.test.tsx` para que cumpla firma/overloads actuales de Framer Motion.
- Limpiar warnings de lint por símbolos no usados en los 3 archivos runtime detectados.
- Re-ejecutar y documentar evidencia de `npm run lint` + `npx tsc --noEmit` en verde.

### Exclusions (Out)
- Sin cambios de UX/UI visible, copy comercial, pricing, metadata de producto o assets de scrollytelling.
- Sin upgrades/downgrades de dependencias ni cambios en lockfile por este objetivo.
- Sin cambios de reglas de lint/ts para “pasar por configuración”.

### Risks
- Mockear Framer Motion con tipos demasiado rígidos puede volver frágiles los tests ante cambios de versión.
- Si se reemplazan `any` por tipos incorrectos (casts agresivos), se puede “silenciar” errores en vez de corregirlos.
- Tocar archivos runtime para warnings, aunque mínimo, puede introducir side effects si no se valida con tests existentes.

### Ready for Proposal
Yes — hay evidencia exacta de bloqueo para ambos gates, alcance delimitado (tests + hygiene técnico), exclusiones claras para no mezclar cambios de producto/contenido, y estrategia recomendada para pasar a `sdd-propose`.
