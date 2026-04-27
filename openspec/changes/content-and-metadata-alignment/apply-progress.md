# Apply Progress — remediation

**Change**: content-and-metadata-alignment  
**Mode**: Strict TDD  
**Scope**: CameraScroll, Footer, TechSpecs, PurchaseConfig tests (minimal remediation)

## TDD Cycle Evidence

| Task | Test File(s) | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|---|---|---|---|---|---|---|---|
| Align CameraScroll heading to centralized identity | `components/__tests__/CameraScroll.test.tsx` | Integration | ✅ `npm test -- ...CameraScroll...` → 21/21 (subset baseline) | ✅ Added drift assertion (`hero.title` diverges, heading still uses `productName`) | ✅ subset rerun → 24/24 | ✅ Existing overlays test + new drift case | ➖ None needed |
| Align Footer heading to centralized identity | `components/__tests__/Footer.test.tsx` | Integration | ✅ Same baseline command above | ✅ Added drift assertion (`footer.heading` diverges, heading still uses `productName`) | ✅ subset rerun → 24/24 | ✅ Existing CTA contract test + new drift case | ➖ None needed |
| Tie TechnicalSections visible values to `sale.specs` | `components/__tests__/TechSpecs.test.tsx`, `src/config/__tests__/site.test.ts` | Integration + Unit | ✅ Same baseline command above | ✅ Added drift assertion (`sale.techSpecs` diverges, UI must still render `sale.specs`) | ✅ subset rerun → 24/24 | ✅ Label/value matrix + drift case | ✅ Small dedup in `site.ts` (shared `specs` object) |
| Strengthen PurchaseConfig CTA assertions | `components/__tests__/PurchaseConfig.test.tsx` | Integration | ✅ Same baseline command above | ✅ Removed implementation-detail coupling (`calledTimes`) and asserted all rendered URLs from centralized builder | ✅ subset rerun → 24/24 | ✅ Per-option full URL assertions (all options) | ✅ Test-only cleanup |

## Command Log (auditable)

```bash
# Safety net
npm test -- components/__tests__/CameraScroll.test.tsx components/__tests__/Footer.test.tsx components/__tests__/TechSpecs.test.tsx components/__tests__/PurchaseConfig.test.tsx src/config/__tests__/site.test.ts
# Result: Test Files 5 passed, Tests 21 passed

# GREEN after remediation
npm test -- components/__tests__/CameraScroll.test.tsx components/__tests__/Footer.test.tsx components/__tests__/TechSpecs.test.tsx components/__tests__/PurchaseConfig.test.tsx src/config/__tests__/site.test.ts
# Result: Test Files 5 passed, Tests 24 passed
```

## Files touched in remediation

- `components/CameraScroll.tsx`
- `components/Footer.tsx`
- `components/TechSpecs.tsx`
- `src/config/site.ts`
- `components/__tests__/CameraScroll.test.tsx`
- `components/__tests__/Footer.test.tsx`
- `components/__tests__/TechSpecs.test.tsx`
- `components/__tests__/PurchaseConfig.test.tsx`
- `src/config/__tests__/site.test.ts`

## Notes

- No build executed (explicit constraint).
- Change kept minimal: no large refactor, only structural tie reinforcement and targeted test hardening.
