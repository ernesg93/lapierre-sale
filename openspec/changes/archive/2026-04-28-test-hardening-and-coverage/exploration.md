## Exploration: test-hardening-and-coverage

### Current State
La suite corre con Vitest 4.1.4 y hoy está verde en ejecución normal (`npm run test:run` → 13 files / 59 tests). El punto crítico es cobertura: `npm run test:run -- --coverage` falla por dependencia faltante (`@vitest/coverage-v8`), aunque `openspec/config.yaml` declara cobertura `available: true`. En calidad de tests, hay debilidad conocida y repetida en `StickyHeader` (smoke assertions y coupling a implementación), y además hay varios tests de UI estática que verifican presencia de texto pero no comportamiento de usuario. También hay coupling por clases CSS/DOM shape en `FAQ`.

### Affected Areas
- `vitest.config.mts` — no define bloque `test.coverage` ni umbrales/reporters; hoy depende de defaults y de una dependencia faltante.
- `package.json` — tiene scripts `test`/`test:run`, pero no incluye `@vitest/coverage-v8` en `devDependencies`.
- `openspec/config.yaml` — declara cobertura disponible, desalineado con la realidad runtime.
- `TESTING.md` — no explicita estado real de cobertura ni policy mínima de gates.
- `openspec/changes/*/verify-report.md` — warnings recurrentes por cobertura no operativa y assertions débiles en `StickyHeader`.
- `components/__tests__/StickyHeader.test.tsx` — 3 casos débiles (presencia/smoke) y uso intensivo de mocks de implementación de Framer Motion.
- `components/__tests__/FAQ.test.tsx` — assertions acopladas a clases Tailwind (`grid-rows-[1fr]`, `opacity-*`) y selectores estructurales (`closest`, `querySelectorAll`).
- `app/__tests__/page.test.tsx` — smoke-level con mocks completos de subcomponentes, casi sin señal conductual.
- `components/__tests__/TrustSection.test.tsx`, `PurchaseConfig.test.tsx`, `TechSpecs.test.tsx` — mayormente contenido estático; bajo poder de detección de regresiones de interacción/accesibilidad.

### Approaches
1. **Cobertura operativa + hardening quirúrgico de tests críticos** — instalar/configurar cobertura v8 y fortalecer tests de mayor riesgo (header, FAQ, navegación) con foco en comportamiento observable.
   - Pros: cierra drift de tooling, sube señal real sin refactor masivo, mantiene alcance controlado.
   - Cons: requiere decidir umbral mínimo realista para evitar gate frágil en primera iteración.
   - Effort: Medium

2. **Hardening amplio de toda la suite UI** — reescribir varios tests de contenido estático hacia escenarios conductuales y accesibilidad en todos los componentes.
   - Pros: mejora fuerte de calidad global de tests.
   - Cons: riesgo alto de scope creep y churn en snapshots/assertions sin impacto equivalente en riesgo de negocio.
   - Effort: High

3. **Solo alinear documentación/config con realidad (sin endurecer tests)** — marcar cobertura no disponible y aceptar suite actual.
   - Pros: muy rápido, elimina inconsistencia documental inmediata.
   - Cons: deja deuda de calidad intacta (smoke/coupling), no mejora poder de detección de regresiones.
   - Effort: Low

### Recommendation
Recomiendo **Approach 1**: normalizar cobertura (provider + config explícita + policy mínima alcanzable) y endurecer de forma **quirúrgica** los tests con mayor fragilidad demostrada (`StickyHeader`, `FAQ`, `page` navegación/ensamble). Esto balancea valor/riesgo: corrige drift estructural de quality gates y mejora señal conductual donde hoy hay más acople a implementación, sin abrir un refactor descontrolado del resto de la suite.

### Risks
- Si se fija un umbral de coverage agresivo de entrada, puede bloquear verify por deuda histórica no relacionada con el cambio.
- Reemplazar assertions por clase CSS puede requerir pequeñas mejoras de testability (roles/aria/estados observables) y eso puede ampliar alcance si no se acota.
- Tests de `CameraScroll` seguirán limitados por `jsdom` sin canvas real; hay que evitar prometer validación visual/frame-perfect en unit tests.

### Ready for Proposal
Yes — avanzar a `sdd-propose` con alcance acotado: (1) cobertura ejecutable y consistente con OpenSpec/docs, (2) hardening de tests priorizados por riesgo (no reescritura total), (3) definición explícita de criterios de aceptación para “test fuerte” vs “smoke”.
