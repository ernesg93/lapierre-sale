# Proposal: Content and Metadata Alignment

## Intent

Unificar temporalmente nombre de producto, precios, claims clave, mensajes comerciales y metadata de la landing para evitar contradicciones entre UI, SEO y CTAs usando una sola fuente existente: `src/config/site.ts`.

## Scope

### In Scope
- Centralizar en `siteConfig` el contenido comercial mínimo que hoy diverge: nombre, precio principal, specs visibles y mensajes/labels de compra.
- Reemplazar strings hardcodeadas en hero, footer, sticky CTA, purchase config y ficha técnica por datos derivados de esa fuente.
- Alinear metadata, tests y specs OpenSpec estrictamente afectados con esa fuente temporal.

### Out of Scope
- Extraer un nuevo dominio `src/content/sale.ts` o refactorizar arquitectura global.
- Cambios de scrollytelling, performance, navegación, animaciones o layout.
- Reescribir copy de negocio más allá de resolver inconsistencias actuales.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `CameraScroll`: el nombre comercial y claims visibles deben derivar de la fuente central temporal.
- `Footer`: el título comercial y CTA deben reflejar la misma fuente central.
- `StickyHeader`: el contexto de precio/CTA debe usar el contenido centralizado vigente.
- `TechnicalSections`: la ficha técnica visible debe alinearse con las specs centralizadas.
- `contact-channel-config`: los mensajes comerciales prefilled de compra deben componerse desde configuración centralizada.

## Approach

Aplicar una alineación mínima sobre `siteConfig` como hub temporal: extender su shape sólo lo necesario, consumirlo desde los componentes divergentes y actualizar tests/specs/docs que hoy validan copy literal inconsistente. Sin mover responsabilidades fuera de `siteConfig` en este cambio.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/config/site.ts` | Modified | Fuente comercial temporal única |
| `app/layout.tsx` | Modified | SEO/OG/Twitter alineados |
| `components/CameraScroll.tsx` | Modified | Hero sin copy hardcodeada |
| `components/PurchaseConfig.tsx` | Modified | Precios/mensajes desde config |
| `components/TechSpecs.tsx` | Modified | Specs visibles alineadas |
| `components/Footer.tsx` / `components/StickyHeader.tsx` | Modified | Nombre/precio consistentes |
| `components/__tests__/*` | Modified | Assertions alineadas a fuente central |
| `openspec/specs/*`, `ARCHITECTURE.md` | Modified | Documentación consistente |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Alinear UI pero no metadata/tests/docs | Med | Checklist explícito por superficie |
| Acople a copy literal en tests | High | Reescribir pruebas contra config/shared values |
| Scope creep hacia refactor mayor | Med | Mantener `siteConfig` como solución temporal |

## Rollback Plan

Revertir cambios del change-set y restaurar literals previas en componentes/specs si aparece regresión comercial o SEO; no hay migraciones ni cambios persistentes de datos.

## Dependencies

- `src/config/site.ts` debe seguir siendo importable por UI y metadata.

## Success Criteria

- [ ] Nombre, precio, specs visibles y mensajes comerciales clave se originan en una sola fuente temporal.
- [ ] Hero, footer, sticky CTA, purchase config y metadata no muestran valores contradictorios.
- [ ] Tests y specs afectados validan el comportamiento alineado sin depender de copy desactualizada.
