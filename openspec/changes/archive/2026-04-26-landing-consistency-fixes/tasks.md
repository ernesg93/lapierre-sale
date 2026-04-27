# Tasks: Landing Consistency Fixes

## Phase 1: Foundation + Policy (TDD seed)

- [x] 1.1 RED: Crear `src/config/__tests__/site.test.ts` con casos para `buildWhatsAppUrl()` (mensaje default y custom con encoding), fallando antes de implementar helper.
- [x] 1.2 GREEN: Modificar `src/config/site.ts` para exportar `buildWhatsAppUrl(message = siteConfig.whatsappMessage)` y mantener `whatsappUrl` derivado del helper.
- [x] 1.3 REFACTOR: Consolidar contrato de WhatsApp en `src/config/site.ts` (sin romper imports actuales de componentes).
- [x] 1.4 Decisión lockfile: tratar `package-lock.json` como incidental en este change y **revertirlo**; solo mantener diff si aparece un cambio intencional de dependencias documentado en `proposal/spec` y PR.

## Phase 2: Navigation + CTA Implementation (RED/GREEN)

- [x] 2.1 RED: Actualizar `components/__tests__/FAQ.test.tsx` para exigir un único destino navegable `#faq` (elemento visible con `id="faq"`).
- [x] 2.2 GREEN: Modificar `components/FAQ.tsx` para exponer `id="faq"` en la sección FAQ sin alterar el comportamiento del acordeón.
- [x] 2.3 RED: Actualizar `components/__tests__/Footer.test.tsx` para validar que el CTA usa URL derivada de config central (sin literals locales de `wa.me`/número).
- [x] 2.4 GREEN: Modificar `components/Footer.tsx` para usar `whatsappUrl`/`buildWhatsAppUrl` desde `src/config/site.ts`.
- [x] 2.5 RED: Actualizar `components/__tests__/PurchaseConfig.test.tsx` para validar mensaje dinámico + base centralizada en `href`.
- [x] 2.6 GREEN: Modificar `components/PurchaseConfig.tsx` para construir enlaces con `buildWhatsAppUrl(opt.message)`.

## Phase 3: Refactor + Consistency Checks

- [x] 3.1 REFACTOR: Eliminar construcción duplicada de URLs de WhatsApp en `components/Footer.tsx` y `components/PurchaseConfig.tsx` dejando una sola fuente de verdad en `src/config/site.ts`.
- [x] 3.2 Extender `src/config/__tests__/site.test.ts` con caso de caracteres especiales/espacios para asegurar encoding estable.
- [x] 3.3 Verificación estática: confirmar que `components/Footer.tsx` y `components/PurchaseConfig.tsx` no contienen número de WhatsApp ni base URL hardcodeada.

## Phase 4: Validation + Merge Readiness

- [x] 4.1 Ejecutar `npm test` y dejar en verde `components/__tests__/FAQ.test.tsx`, `Footer.test.tsx`, `PurchaseConfig.test.tsx` y `src/config/__tests__/site.test.ts`.
- [x] 4.2 Verificar escenarios de specs: anchor único `faq`, CTAs centralizados, y gobernanza de lockfile aplicada.
- [x] 4.3 Confirmar en diff final que `package-lock.json` quedó revertido (o, si no, justificar explícitamente el cambio intencional de dependencias en revisión).
