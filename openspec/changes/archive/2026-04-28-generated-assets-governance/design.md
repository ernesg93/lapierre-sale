# Design: Generated Assets Governance

## Technical Approach

Aplicar la solución mínima sin cambiar el contrato runtime existente: `public/frames/manifest.json` pasa a ser un artefacto generado no versionado, `scripts/build-frames-manifest.mjs` sigue como única fuente de verdad, y el flujo soportado queda documentado alrededor de `npm run dev` / `npm run build`. Esto conserva la dependencia actual de `components/CameraScroll.tsx` a `/frames/manifest.json` y elimina churn incidental de Git.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Gobernanza del manifest | Mantenerlo trackeado / destrackearlo | Destrackear e ignorar `public/frames/manifest.json` | El archivo ya se genera automáticamente en `predev` y `prebuild`; seguir trackeándolo agrega ruido sin aportar valor fuente. |
| Fuente de verdad | Manifest versionado / script generador | Mantener `scripts/build-frames-manifest.mjs` como fuente de verdad | Ya produce el output requerido por runtime y evita tocar arquitectura de scrollytelling. |
| Flujo soportado | `next dev` directo / scripts npm | Documentar `npm run dev` y `npm run build` como únicos flujos soportados | Los hooks `predev`/`prebuild` son la salvaguarda que garantiza que el manifest exista antes del consumo runtime. |

## Data Flow

```text
Contributor runs npm run dev|build
        │
        ├─> predev|prebuild
        │     └─> scripts/build-frames-manifest.mjs
        │             └─> writes public/frames/manifest.json
        │
        └─> next dev|build
                └─> CameraScroll fetches /frames/manifest.json at runtime
```

Si alguien bypasséa npm y ejecuta `next dev` directo, el manifest puede faltar y `CameraScroll` cae en su fallback actual.

## File Changes

| File | Action | Description |
|---|---|---|
| `.gitignore` | Modify | Reemplazar la regla inválida con un patrón Git-compatible para `public/frames/manifest.json`. |
| `public/frames/manifest.json` | Delete (tracked) | Sacarlo del índice; seguirá recreándose localmente como output generado e ignorado. |
| `README.md` | Modify | Alinear la documentación con el flujo soportado y advertir contra `next dev` directo. |
| `package.json` | Keep | No cambio funcional; `predev` y `prebuild` ya preservan la garantía requerida. |
| `scripts/build-frames-manifest.mjs` | Keep | Sin cambios; permanece como productor único del manifest. |

## Interfaces / Contracts

No se agregan interfaces nuevas. El contrato existente se mantiene:

```ts
// Runtime contract preserved
fetch('/frames/manifest.json') -> string[]
```

La política nueva cambia gobernanza Git, no formato ni ubicación del asset.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | N/A | No se cambia lógica de negocio ni formato del manifest. |
| Integration | Generación del manifest | Ejecutar `npm run predev` y verificar que `public/frames/manifest.json` se recrea con rutas válidas. |
| Integration | Ignore efectivo | Verificar con Git que el archivo deja de figurar como tracked/modified y aparece ignorado tras regenerarse. |
| Manual | Flujo documentado | Confirmar que README explica usar `npm run dev` / `npm run build` y el riesgo de bypass. |

## Migration / Rollout

No migration required. La adopción consiste en: corregir `.gitignore`, remover `manifest.json` del índice Git, y actualizar documentación. El archivo seguirá existiendo localmente cuando los scripts npm corran.

## Open Questions

- [ ] Ninguna bloqueante; sólo queda decidir si la regla de ignore se escribe como `/public/frames/manifest.json` o `public/frames/manifest.json` (ambas son válidas, preferible con `/` anclado a raíz para mayor claridad).
