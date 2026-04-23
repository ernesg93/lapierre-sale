# AI Handoff — Lapierre Sale

Última actualización: 2026-04-23

Esta carpeta existe para **preservar contexto crítico en duro dentro del repo** y permitir que otra IA o persona retome el trabajo aunque se pierda la conversación actual.

## Qué contiene

- `PROJECT_REVIEW_2026-04-23.md`
  - Auditoría técnica y funcional del proyecto.
  - Hallazgos verificados en código, tests, lint, documentación e historial Git.
- `SDD_MASTER_PLAN_2026-04-23.md`
  - Plan maestro para mejorar el proyecto mediante cambios SDD pequeños, auditables y archivables.

## Cómo retomar el trabajo

1. Leer primero `PROJECT_REVIEW_2026-04-23.md`.
2. Leer después `SDD_MASTER_PLAN_2026-04-23.md`.
3. Usar como primer cambio sugerido: `landing-consistency-fixes`.
4. Recordar restricciones del proyecto y del usuario:
   - **No hacer build después de cambios**.
   - Verificar afirmaciones técnicas con evidencia antes de responder.
   - El proyecto ya tiene **SDD activo** en `openspec/config.yaml`.
   - `strict_tdd: true` está habilitado.

## Estado conocido al momento del handoff

- Proyecto: landing one-page premium para venta de bicicleta Lapierre.
- Stack: Next.js 16, React 19, Tailwind 4, Framer Motion, Vitest.
- Rama observada: `feat/testing-and-dev`.
- Tests: `npm run test:run` → **32/32 OK**.
- Lint: `npm run lint` → **falla actualmente**.

## Nota importante

Esta carpeta fue creada intencionalmente **dentro del proyecto y fuera de `.gitignore`** para que el contexto pueda persistir en el repositorio si luego se decide commitearlo.
