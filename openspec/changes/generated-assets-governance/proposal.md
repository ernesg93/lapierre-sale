# Proposal: Generated Assets Governance

## Intent

Definir una política mínima para que `public/frames/manifest.json` sea tratado como artefacto generado, eliminando churn incidental de Git sin romper el contrato runtime que hoy consume `components/CameraScroll.tsx`.

## Scope

### In Scope
- Destrackear `public/frames/manifest.json` y aplicar una regla de ignore válida.
- Mantener la garantía de generación automática vía `predev` y `prebuild`.
- Documentar el flujo correcto para contributors (`npm run dev` / `npm run build`).

### Out of Scope
- Rediseñar `CameraScroll` para dejar de usar manifest.
- Reemplazar el manifest por listado runtime/server-side.
- Gobernanza general de todos los assets generados del repositorio.

## Capabilities

### New Capabilities
- `generated-assets-governance`: define cuándo un artefacto generado puede quedar untracked/ignored y qué salvaguardas mínimas debe conservar.

### Modified Capabilities
- `dependency-lockfile-governance`: extender el patrón de “incidental churn MUST be reverted/ignored by policy” a artefactos generados equivalentes.

## Approach

Adoptar la estrategia mínima: `manifest.json` deja de versionarse, `.gitignore` pasa a matchear correctamente, y el proyecto conserva `scripts/build-frames-manifest.mjs` como fuente de verdad ejecutada en `predev`/`prebuild`. README debe advertir que bypassear esos scripts (`next dev` directo) rompe la garantía local.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `.gitignore` | Modified | Regla efectiva para ignorar `public/frames/manifest.json`. |
| `public/frames/manifest.json` | Removed | Sale del tracking; sigue existiendo como output generado. |
| `package.json` | Modified | Se preserva la garantía de generación en `predev`/`prebuild`. |
| `README.md` | Modified | Flujo operativo y expectativa para contributors. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `next dev` directo deja el manifest ausente | Med | Documentar y sostener `npm run dev` como flujo soportado. |
| Ignore sin destrackeo real mantiene ruido | Med | Incluir remoción del índice como parte explícita del cambio. |
| Futuro cambio de scripts rompe el contrato runtime | Low | Mantener `predev`/`prebuild` como requisito verificable. |

## Rollback Plan

Revertir la regla de ignore, re-trackear `public/frames/manifest.json`, regenerarlo y restaurar la política anterior de archivo versionado.

## Dependencies

- `scripts/build-frames-manifest.mjs` debe seguir siendo la única fuente de verdad.
- Los flujos soportados deben ejecutar `npm run dev` o `npm run build`.

## Success Criteria

- [ ] `public/frames/manifest.json` deja de aparecer en cambios fuera de scope.
- [ ] Dev/build soportados siguen generando el manifest antes de servir o compilar.
- [ ] Contributors tienen documentación explícita sobre el flujo correcto y el riesgo de bypass.
