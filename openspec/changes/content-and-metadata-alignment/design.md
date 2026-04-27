# Design: Content and Metadata Alignment

## Technical Approach

Centralizar la verdad comercial temporal en `siteConfig.sale` y hacer que UI, metadata y tests lean desde esa estructura. Para no romper consumidores actuales, `siteConfig.name`, `price`, `title`, `description`, `ogImage` y `specs` seguirán existiendo, pero como aliases derivados del bloque `sale` en el mismo archivo.

## Architecture Decisions

| Decision | Alternatives considered | Choice | Rationale |
|---|---|---|---|
| Hub temporal | Nuevo `src/content/sale.ts`; literals por componente | Extender `src/config/site.ts` con `sale` | Es el cambio mínimo pedido y evita abrir un refactor de dominio. |
| Compatibilidad | Migrar todos los consumidores a un shape nuevo; mantener root plano | Introducir `sale` y conservar campos root derivados | Permite migración incremental y reduce impacto en metadata/helpers ya existentes. |
| Tests | Seguir con asserts literales; snapshot masivo | Importar valores compartidos desde config | Evita pruebas frágiles cuando cambia sólo el copy central. |

## Data Flow

```text
siteConfig.sale
   ├─→ aliases root en src/config/site.ts
   │     ├─→ app/layout.tsx metadata
   │     └─→ helpers buildWhatsAppUrl / whatsappUrl
   └─→ componentes UI
         ├─→ CameraScroll
         ├─→ PurchaseConfig
         ├─→ TechSpecs
         ├─→ Footer
         └─→ StickyHeader
```

Secuencia de cambio: editar `siteConfig.sale` → se recalculan aliases/root exports → UI y metadata renderizan el mismo contenido → tests importan la misma fuente y validan el contrato.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/config/site.ts` | Modify | Agregar `sale` con identidad, claims, purchase options, CTA copy y specs visibles; derivar aliases root desde esa fuente. |
| `app/layout.tsx` | Modify | Mantener `Metadata`, pero leer sólo campos alineados a la nueva fuente central. |
| `components/CameraScroll.tsx` | Modify | Reemplazar título/claims hardcodeados por `siteConfig.sale.hero`. |
| `components/PurchaseConfig.tsx` | Modify | Mapear opciones desde config y generar mensajes dinámicos con `buildWhatsAppUrl`. |
| `components/TechSpecs.tsx` | Modify | Renderizar filas visibles desde `siteConfig.sale.techSpecs` o spec rows derivados. |
| `components/Footer.tsx` | Modify | Derivar heading, subcopy y CTA principal desde `siteConfig.sale.footer`. |
| `components/StickyHeader.tsx` | Modify | Mostrar nombre y precio desde la misma fuente comercial. |
| `components/__tests__/CameraScroll.test.tsx` | Modify | Assert contra valores centralizados de hero. |
| `components/__tests__/PurchaseConfig.test.tsx` | Modify | Assert de opciones y mensajes usando config compartida. |
| `components/__tests__/TechSpecs.test.tsx` | Modify | Iterar specs esperadas desde config, no literals. |
| `components/__tests__/Footer.test.tsx` | Modify | Validar heading y contratos WhatsApp centralizados. |
| `components/__tests__/StickyHeader.test.tsx` | Modify | Validar identidad/precio derivados de config. |
| `src/config/__tests__/site.test.ts` | Modify | Cubrir aliases y composición de URLs. |
| `app/__tests__/layout.metadata.test.ts` | Create | Verificar SEO/OG/Twitter alineados con `siteConfig.sale`. |

## Interfaces / Contracts

```ts
type SaleConfig = {
  productName: string;
  price: string;
  metadata: { title: string; description: string; ogImage: string };
  hero: { eyebrow?: string; title: string; claims: string[]; detailLines: string[] };
  footer: { heading: string; blurb: string; primaryCtaLabel: string };
  purchaseOptions: Array<{ id: string; title: string; price: string; description: string; highlight: boolean; badge?: string }>;
  techSpecs: Array<{ label: string; value: string }>;
};
```

Los mensajes de compra no se guardan hardcodeados por opción: se componen con helper desde `productName` + `purchaseOptions.title`, así la identidad comercial vive en un solo lugar.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | `siteConfig` aliases y helpers | Extender `src/config/__tests__/site.test.ts` para cubrir campos root derivados y URLs WhatsApp. |
| Integration | UI alineada | Actualizar RTL tests de CameraScroll, PurchaseConfig, TechSpecs, Footer y StickyHeader importando `siteConfig.sale`. |
| Integration | Metadata | Nuevo test del export `metadata` en `app/layout.tsx` contra `siteConfig.sale.metadata`. |
| E2E | N/A | No requerido por este cambio. |

## Migration / Rollout

No migration required. Es una consolidación interna de configuración y render.

## Open Questions

- [ ] Ninguna bloqueante; si negocio redefine el copy canónico, sólo deberá actualizar `siteConfig.sale`.
