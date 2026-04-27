# Tasks: Content and Metadata Alignment

## Phase 1: Centralize commercial source in `src/config/site.ts`

- [x] 1.1 **RED** — Extend `src/config/__tests__/site.test.ts` with failing cases for `siteConfig.sale` and root aliases (`name`, `price`, `title`, `description`, `ogImage`, `specs`).
- [x] 1.2 **RED** — Add failing URL/message cases in `src/config/__tests__/site.test.ts` proving WhatsApp CTA messages are composed from centralized sale data.
- [x] 1.3 **GREEN** — Implement `sale` contract in `src/config/site.ts` (`productName`, `price`, `metadata`, `hero`, `footer`, `purchaseOptions`, `techSpecs`).
- [x] 1.4 **GREEN** — Derive backward-compatible root exports in `src/config/site.ts` from `sale` so existing consumers keep working.
- [x] 1.5 **REFACTOR** — Consolidate CTA helpers in `src/config/site.ts` to avoid duplicated product/phone/base-url literals.

## Phase 2: Align UI and metadata consumers

- [x] 2.1 **RED** — Create `app/__tests__/layout.metadata.test.ts` asserting SEO/OG/Twitter title, description, siteName, image alt, and image URL from `siteConfig.sale`.
- [x] 2.2 **GREEN** — Update `app/layout.tsx` `metadata` export to read centralized sale identity fields.
- [x] 2.3 **RED** — Update `components/__tests__/CameraScroll.test.tsx` and `components/__tests__/StickyHeader.test.tsx` to assert centralized product/price/hero values.
- [x] 2.4 **GREEN** — Update `components/CameraScroll.tsx` and `components/StickyHeader.tsx` to consume `siteConfig.sale` (remove contradictory literals).
- [x] 2.5 **RED** — Update `components/__tests__/Footer.test.tsx` and `components/__tests__/PurchaseConfig.test.tsx` to assert centralized CTA URL/message composition.
- [x] 2.6 **GREEN** — Update `components/Footer.tsx` and `components/PurchaseConfig.tsx` to build CTAs only through centralized config/helpers.
- [x] 2.7 **RED** — Update `components/__tests__/TechSpecs.test.tsx` to assert visible rows from centralized specs data.
- [x] 2.8 **GREEN** — Update `components/TechSpecs.tsx` to render centralized `sale.techSpecs` values.

## Phase 3: Update affected tests and spec alignment

- [x] 3.1 Make all touched tests import expected values from `src/config/site.ts` instead of stale literals.
- [x] 3.2 Verify scenario coverage mapping for `CameraScroll`, `Footer`, `StickyHeader`, `TechnicalSections`, `site-metadata`, and `contact-channel-config` against updated tests.
- [x] 3.3 If scenario wording drift appears, update `openspec/changes/content-and-metadata-alignment/specs/**/spec.md` to match implemented behavior.

## Phase 4: Verification gates (lint, tsc, relevant tests)

- [x] 4.1 Run targeted tests: `npm test -- site.test.ts layout.metadata.test.ts CameraScroll.test.tsx StickyHeader.test.tsx Footer.test.tsx PurchaseConfig.test.tsx TechSpecs.test.tsx`.
- [x] 4.2 Run `npm run lint` and fix reported issues for touched files.
- [x] 4.3 Run `npx tsc --noEmit` and resolve any typing regressions from the new `sale` contract.
- [x] 4.4 Run full `npm test` to confirm no collateral regressions outside targeted suites.

## Phase 5: Remediation from verify-report

- [x] 5.1 Generate/update `apply-progress` with auditable Strict TDD evidence (Safety Net, RED, GREEN, TRIANGULATE, REFACTOR).
- [x] 5.2 Reinforce CameraScroll and Footer structural ties to centralized product identity without broad refactor.
- [x] 5.3 Reinforce TechnicalSections structural tie to centralized `sale.specs` and harden associated tests.
- [x] 5.4 Strengthen PurchaseConfig tests by asserting all option URLs from centralized builders (remove weak implementation-detail coupling).
- [x] 5.5 Run minimal relevant verification for remediation scope (targeted tests only, no build).
