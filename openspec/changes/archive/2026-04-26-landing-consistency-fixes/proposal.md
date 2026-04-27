# Proposal: Landing Consistency Fixes

## Intent

Corregir una inconsistencia visible de la landing (`#faq` sin destino válido), eliminar duplicación de URLs/número de WhatsApp y fijar una política explícita para el churn actual de `package-lock.json`.

## Scope

### In Scope
- Alinear el link `#faq` con una sección FAQ navegable.
- Reusar `src/config/site.ts` como fuente de verdad para WhatsApp en `Footer` y `PurchaseConfig`.
- Documentar que `package-lock.json` solo se commitea con cambios intencionales de dependencias; churn incidental se revierte.

### Out of Scope
- Rediseño visual, copy comercial o cambios de UX fuera de estos puntos.
- Refactor amplio de CTAs o de toda la configuración comercial.
- Upgrades de dependencias o limpieza masiva del lockfile.

## Capabilities

### New Capabilities
- `landing-section-navigation`: asegura que los anchors públicos de la landing tengan un destino real y estable.
- `contact-channel-config`: obliga a que CTAs de WhatsApp usen configuración centralizada, incluso con mensaje dinámico.
- `dependency-lockfile-governance`: define cuándo `package-lock.json` es cambio válido versus churn a revertir.

### Modified Capabilities
- None.

## Approach

Seguir el enfoque mínimo recomendado en exploración: agregar el destino FAQ faltante, extraer/reusar el origen común de WhatsApp sin expandir el contrato más de lo necesario y dejar la política de lockfile documentada dentro del cambio para que guíe implementación y review.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/FAQ.tsx` | Modified | Expone destino navegable para `#faq`. |
| `components/Footer.tsx` | Modified | Deja de construir WhatsApp manualmente. |
| `components/PurchaseConfig.tsx` | Modified | Reusa config/helper central para mensajes dinámicos. |
| `src/config/site.ts` | Modified | Consolida el contrato de WhatsApp. |
| `components/__tests__/*.test.tsx` | Modified | Ajusta expectativas al contrato central. |
| `package-lock.json` | Modified/Policy | Se trata como churn salvo cambio intencional de dependencias. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Tests acoplados a literales actuales | Med | Validar contra config compartida. |
| Formato incorrecto de mensaje WhatsApp | Med | Mantener tests sobre URLs prellenadas. |
| Política lockfile ignorada en PRs | Low | Dejar criterio explícito en artefactos del cambio. |

## Rollback Plan

Revertir los cambios en FAQ, CTAs y config central; restaurar tests previos; descartar cualquier diff incidental de `package-lock.json`.

## Dependencies

- Exploración `sdd/landing-consistency-fixes/explore`.

## Success Criteria

- [ ] El enlace “Preguntas” navega a una sección FAQ existente.
- [ ] `Footer` y `PurchaseConfig` dejan de hardcodear el número/URL de WhatsApp.
- [ ] La propuesta/especificación deja explícito que el lockfile incidental no se mergea.
