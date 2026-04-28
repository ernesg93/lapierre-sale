# Proposal: Test Hardening and Coverage

## Intent

Corregir el drift entre la cobertura declarada y la cobertura realmente ejecutable, y endurecer un subconjunto de tests frágiles para que detecten regresiones conductuales en vez de depender de smoke checks o detalles de implementación.

## Scope

### In Scope
- Habilitar cobertura ejecutable en Vitest con provider/config explícitos y policy mínima realista.
- Alinear `openspec/config.yaml` y `TESTING.md` con el estado real de cobertura y uso esperado.
- Fortalecer tests priorizados de `StickyHeader`, `FAQ` y `app/page` hacia assertions observables de navegación, interacción y accesibilidad.

### Out of Scope
- Reescribir toda la suite UI o elevar cobertura global de todos los componentes.
- Validación visual/frame-perfect de scrollytelling, canvas o animaciones complejas en `jsdom`.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- None.

## Approach

Aplicar una estrategia quirúrgica: primero hacer operativa la cobertura con configuración explícita; después reemplazar assertions débiles en áreas de mayor riesgo por checks de comportamiento visible para usuario. El umbral inicial debe reflejar la realidad actual para evitar gates falsamente rojos.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `vitest.config.mts` | Modified | Configurar coverage provider, reporters y thresholds. |
| `package.json` | Modified | Declarar dependencia/script necesarios para coverage. |
| `openspec/config.yaml` | Modified | Alinear metadata de verify/coverage con runtime real. |
| `TESTING.md` | Modified | Documentar ejecución y alcance real de coverage. |
| `components/__tests__/StickyHeader.test.tsx` | Modified | Reemplazar smoke/mocks frágiles por checks conductuales. |
| `components/__tests__/FAQ.test.tsx` | Modified | Reducir coupling a clases CSS/DOM shape. |
| `app/__tests__/page.test.tsx` | Modified | Aumentar señal sobre navegación/ensamble crítico. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Threshold inicial demasiado alto | Med | Fijar baseline mínima y revisarla luego. |
| Scope creep por mejorar testability | Med | Limitar cambios a señales observables necesarias. |
| Falsa expectativa sobre canvas/animaciones | Low | Excluir validación visual avanzada del alcance. |

## Rollback Plan

Revertir cambios de config/dependencias y restaurar tests previos si coverage introduce inestabilidad no acotada; dejar explícitamente coverage como no operativa en docs/config hasta una nueva iteración.

## Dependencies

- `@vitest/coverage-v8` o alternativa equivalente soportada por Vitest 4.1.4.

## Success Criteria

- [ ] `npm run test:run -- --coverage` ejecuta sin fallar por tooling faltante.
- [ ] Configuración y documentación de coverage coinciden con el comportamiento real del repo.
- [ ] Tests priorizados dejan de depender de clases CSS, DOM shape o smoke-only assertions.
- [ ] La suite sigue verde sin prometer cobertura visual de canvas/scrollytelling.
