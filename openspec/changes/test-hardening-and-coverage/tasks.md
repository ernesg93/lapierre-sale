# Tasks: Test Hardening and Coverage

## Phase 1: Infrastructure de cobertura (dependency-first)

- [x] 1.1 Actualizar `package.json` (y lockfile) para declarar `@vitest/coverage-v8` compatible con Vitest 4.1.4.
- [x] 1.2 Modificar `vitest.config.mts` con `test.coverage` explícito: provider, reporters, include/exclude y thresholds declarados.
- [x] 1.3 Ejecutar `npm run test:run -- --coverage`, capturar baseline real y fijar thresholds iniciales redondeados hacia abajo en `vitest.config.mts`.
- [x] 1.4 Verificar que el flujo sin coverage siga operativo con el comando de test por defecto (`npm test`).

## Phase 2: Hardening de tests priorizados (TDD: RED → GREEN → REFACTOR)

- [x] 2.1 RED `components/__tests__/StickyHeader.test.tsx`: escribir asserts observables (visibilidad, intención de navegación `#faq`, contexto activo) sin clases CSS.
- [x] 2.2 GREEN `components/__tests__/StickyHeader.test.tsx`: ajustar mock local de Framer Motion para serializar MotionValue a props/estilos observables y hacer pasar los tests.
- [x] 2.3 REFACTOR `components/__tests__/StickyHeader.test.tsx`: consolidar helpers/mocks evitando acople a DOM shape.
- [x] 2.4 RED `components/__tests__/FAQ.test.tsx`: cubrir estado colapsado inicial, toggle y exclusión usando `aria-expanded`/`aria-controls`.
- [x] 2.5 GREEN `components/__tests__/FAQ.test.tsx`: implementar queries accesibles y asserts de panel controlado para que pasen los escenarios.
- [x] 2.6 REFACTOR `components/__tests__/FAQ.test.tsx`: simplificar setup y eliminar assertions frágiles.
- [x] 2.7 RED `app/__tests__/page.test.tsx`: definir casos de integración para secciones críticas y destino único discoverable de `#faq`.
- [x] 2.8 GREEN `app/__tests__/page.test.tsx`: mockear sólo secciones pesadas y renderizar real `StickyHeader` + `FAQ` para cumplir contrato de navegación.
- [x] 2.9 REFACTOR `app/__tests__/page.test.tsx`: estabilizar doubles y reducir ruido de implementación.

## Phase 3: Consistencia documental y OpenSpec

- [x] 3.1 Actualizar `TESTING.md` con comando real de coverage, policy de baseline y no-objetivos (sin validación visual canvas/scrollytelling en jsdom).
- [x] 3.2 Ajustar `openspec/config.yaml` para que `testing.coverage.command` y metadata de calidad reflejen exactamente runtime (`lint`, `tsc --noEmit`, `test`, `test:run -- --coverage`).

## Phase 4: Verificación final (sin build)

- [x] 4.1 Ejecutar `npm run lint` y corregir desvíos bloqueantes.
- [x] 4.2 Ejecutar `npx tsc --noEmit` y resolver errores de tipado.
- [x] 4.3 Ejecutar `npm test` para confirmar flujo no-coverage.
- [x] 4.4 Ejecutar `npm run test:run -- --coverage` y validar que emite summary y respeta thresholds explícitos.
- [x] 4.5 Registrar evidencia de verificación en el change (`openspec/changes/test-hardening-and-coverage/tasks.md` checklist y notas de ejecución).

## Notas de ejecución

- Baseline coverage (v8): Statements 83.09%, Branches 69.86%, Functions 82.45%, Lines 86.45%.
- Thresholds fijados (floor): `statements: 83`, `branches: 69`, `functions: 82`, `lines: 86`.
- Verificaciones finales ejecutadas (sin build):
  - `npm run lint` ✅
  - `npx tsc --noEmit` ✅
  - `npm test -- --run` ✅ (13 files, 59 tests)
  - `npm run test:run -- --coverage` ✅ (summary emitido, thresholds respetados)
