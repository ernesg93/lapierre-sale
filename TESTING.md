# Pruebas y Aseguramiento de Calidad

Este proyecto usa **Vitest + React Testing Library** con entorno **jsdom**.

## Comandos oficiales

```bash
npm run lint
npx tsc --noEmit
npm test
npm run test:run -- --coverage
```

- `npm test`: flujo por defecto sin coverage (watch/local loop).
- `npm run test:run -- --coverage`: ejecución determinística con reporte de cobertura (`text`, `json-summary`, `html`).

## Política de cobertura (baseline inicial)

Los thresholds iniciales están fijados en `vitest.config.mts` con piso redondeado hacia abajo desde la primera corrida verde de coverage:

- **Lines**: 86
- **Statements**: 83
- **Functions**: 82
- **Branches**: 69

Esta baseline es el piso operativo actual. Se puede subir en cambios futuros, pero no dejar implícita ni sin documentación.

## No objetivos de esta suite

En `jsdom` **NO** se valida comportamiento visual/canvas del pipeline de scrollytelling (por ejemplo `HTMLCanvasElement.getContext`).
Los tests cubren contrato funcional y accesible (navegación, composición crítica y estados de interacción), no fidelity visual.
