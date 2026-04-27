# Design: Landing Consistency Fixes

## Technical Approach
Aplicar un fix mínimo y consistente sobre tres frentes ya detectados en propuesta/specs: (1) exponer un único destino navegable `faq` en `FAQ.tsx`, (2) mover la construcción de URLs de WhatsApp a `src/config/site.ts` para reutilizar base + mensaje por default u opcional, y (3) tratar `package-lock.json` como artefacto de salida solo cuando el cambio de dependencias sea intencional.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|---|---|---|---|
| FAQ anchor ownership | `StickyHeader` hash-only; wrapper extra; `FAQ` define `id` | El anchor debe vivir donde está la sección visible; wrappers agregan ruido | `FAQ.tsx` agrega `id="faq"` en su `<section>` |
| WhatsApp contract | Reusar solo `whatsappUrl`; helper nuevo; util separado | `whatsappUrl` fijo no cubre mensajes dinámicos; util separado sobre-diseña | `site.ts` exporta helper `buildWhatsAppUrl(message?)` y mantiene `whatsappUrl` |
| Lockfile governance | Automatizar script; documentar policy en cambio; ignorar lockfile | Automatizar ahora expande alcance; ignorarlo rompe reproducibilidad | Política documental en OpenSpec/Engram y revert manual si no hay intención de deps |

**Rationale**: estas elecciones siguen el patrón existente de configuración central (`siteConfig`, `whatsappUrl`), corrigen el bug sin mover responsabilidades y evitan abrir un refactor comercial más grande.

## Data Flow
```text
StickyHeader "Preguntas" ──→ scrollToSection("faq") ──→ FAQ<section id="faq">

Footer CTA ──→ whatsappUrl / buildWhatsAppUrl() ──→ siteConfig.whatsappNumber
PurchaseConfig CTA ──→ buildWhatsAppUrl(opt.message) ──→ encoded text param
```

## File Changes
| File | Action | Description |
|---|---|---|
| `openspec/changes/landing-consistency-fixes/design.md` | Create | Diseño técnico del cambio. |
| `components/FAQ.tsx` | Modify | Agregar anchor estable `id="faq"` sin cambiar UX del acordeón. |
| `components/Footer.tsx` | Modify | Reemplazar literales `wa.me` y número hardcodeado por contrato central. |
| `components/PurchaseConfig.tsx` | Modify | Usar helper central para mensajes dinámicos por opción. |
| `src/config/site.ts` | Modify | Exponer helper reutilizable y preservar export actual `whatsappUrl`. |
| `components/__tests__/FAQ.test.tsx` | Modify | Verificar presencia del anchor FAQ único. |
| `components/__tests__/Footer.test.tsx` | Modify | Validar links contra config/helper, no contra literal hardcodeado. |
| `components/__tests__/PurchaseConfig.test.tsx` | Modify | Validar base central y encoding del mensaje dinámico. |
| `package-lock.json` | Revert/No-op | No se versiona en este change salvo intención explícita de dependencias. |

## Interfaces / Contracts
```ts
export const siteConfig = {
  whatsappNumber: string,
  whatsappMessage: string,
  // ...
} as const;

export function buildWhatsAppUrl(message = siteConfig.whatsappMessage): string;
export const whatsappUrl: string; // buildWhatsAppUrl()
```

Contrato: los componentes NO deben hardcodear `wa.me`, número ni query `text`; solo proveen mensaje opcional cuando el CTA lo necesita.

## Testing Strategy
| Layer | What to Test | Approach |
|---|---|---|
| Unit | `buildWhatsAppUrl` | Cubrir mensaje default y mensaje custom con encoding correcto. |
| Integration | `FAQ`, `Footer`, `PurchaseConfig` | RTL + Vitest verificando `id="faq"`, cantidad de links y `href` derivados de config central. |
| E2E | None | No requerido; el cambio es acotado y el proyecto no usa E2E. |

## Migration / Rollout
No migration required. Implementación directa y rollback simple revirtiendo cambios de componentes/config y descartando cualquier diff incidental de `package-lock.json`.

## Open Questions
- [ ] ¿Queremos en un cambio futuro eliminar `npm install sharp --no-save` de `scripts/convert-to-webp.mjs` para reducir churn de lockfile en origen?
