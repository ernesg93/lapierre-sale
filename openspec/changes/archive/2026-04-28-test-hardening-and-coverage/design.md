# Design: Test Hardening and Coverage

## Technical Approach

Aplicar un cambio acotado en dos frentes: (1) volver ejecutable la cobertura de Vitest con configuración explícita y thresholds iniciales basados en la primera corrida verde; (2) reemplazar assertions frágiles en `StickyHeader`, `FAQ` y `app/page` por señales observables de navegación, estado accesible e integración de la landing. No se amplía el alcance hacia validación visual de canvas ni reescritura masiva de la suite.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Coverage provider | `v8`, `istanbul`, seguir sin provider | `@vitest/coverage-v8` con `test.coverage` explícito | Es la dependencia ya propuesta, calza con Vitest 4.1.4 y corrige el drift real sin introducir tooling extra. |
| Coverage policy | Threshold alto aspiracional, `0`, baseline mínimo explícito | Baseline mínimo explícito derivado de la primera corrida exitosa | Evita gates falsamente rojos por deuda histórica, pero deja una policy real y documentada. |
| Hardening de `StickyHeader` | Cambiar runtime, seguir con smoke tests, mejorar mocks de test | Mejorar el mock local de Framer Motion para exponer estilos/estado observables | Permite verificar opacidad/CTA/navegación sin tocar comportamiento productivo. |
| Hardening de `FAQ` | Seguir chequeando clases, reescribir componente, assert sobre ARIA/state | Basarse en `aria-expanded`, `aria-controls` y exclusión entre botones | Reduce coupling a Tailwind/DOM shape y usa contrato accesible ya presente. |
| Cobertura de `app/page` | Mockear todo, render real completo | Mockear sólo secciones pesadas/no relevantes y dejar real `StickyHeader` + `FAQ` | Sube señal de integración de navegación interna sin meter canvas/scrollytelling en jsdom. |

## Data Flow

```text
npm run test:run -- --coverage
        |
        v
vitest.config.mts -> coverage provider/reporters/thresholds
        |
        +--> TESTING.md + openspec/config.yaml aligned with runtime
        |
        +--> StickyHeader.test -> motion mocks resolve observable styles/hash updates
        +--> FAQ.test -> aria-expanded / controlled-panel assertions
        +--> page.test -> landing composition + #faq navigation contract
```

## File Changes

| File | Action | Description |
|---|---|---|
| `vitest.config.mts` | Modify | Add explicit `test.coverage` block: provider, reporters, include/exclude, thresholds. |
| `package.json` | Modify | Add coverage devDependency; keep commands centered on existing `test:run`. |
| `openspec/config.yaml` | Modify | Reflect real verify/coverage command and expectations. |
| `TESTING.md` | Modify | Document how to run coverage, what it gates, and explicit non-goals for canvas/visual behavior. |
| `components/__tests__/StickyHeader.test.tsx` | Modify | Replace smoke assertions with observable checks for hash navigation, progress/CTA visibility, and scroll-derived style state via narrowed test mocks. |
| `components/__tests__/FAQ.test.tsx` | Modify | Replace Tailwind/DOM-shape assertions with button state and controlled-answer assertions. |
| `app/__tests__/page.test.tsx` | Modify | Convert smoke layout test into bounded integration test for landing composition and FAQ navigation. |
| `eslint.config.mjs` | Modify | Narrow lint scope to repository source/ops paths and keep generated artifacts out of checks. |

## Interfaces / Contracts

- No public runtime APIs change.
- Test contract for `StickyHeader`: mocked `motion.*` wrappers MUST serialize MotionValue-like inputs into plain DOM styles/props before assertions.
- Coverage contract: repository documentation and `openspec/config.yaml` MUST match the actual command/config required for `npm run test:run -- --coverage`.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Coverage config loads and runs | Execute `npm run test:run -- --coverage` after provider/config changes. |
| Integration | `StickyHeader` behavior | Assert hash updates, CTA/product info visibility, and scroll-driven style outcomes through test-local motion mocks. |
| Integration | `FAQ` behavior | Assert initial collapsed state, toggle/open-close flow, and exclusive expansion via ARIA attributes and controlled panel ids. |
| Integration | Landing composition | In `app/page.test.tsx`, keep heavy sections mocked but render real `StickyHeader` + `FAQ` to assert `#faq` navigation contract. |

## Migration / Rollout

No migration required.

## Open Questions

- [ ] Exact initial threshold numbers must come from the first successful coverage run and be rounded down to a stable floor; do not guess aspirational values.
