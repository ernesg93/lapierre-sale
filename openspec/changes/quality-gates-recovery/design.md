# Design: Quality Gates Recovery

## Technical Approach

Apply a bounded technical cleanup that fixes only the current lint/type-check blockers. Tests will replace `any`-based Framer Motion and `IntersectionObserver` doubles with small typed helpers that satisfy current library overloads. Runtime files will only remove unused symbols already reported by ESLint. This implements the proposal/spec goal of restoring gates without product-surface changes.

## Architecture Decisions

### Decision: Keep typing fixes local to each test file

| Option | Tradeoff | Decision |
|---|---|---|
| Shared test utils | Reusable, but expands scope and introduces new maintenance surface | Rejected |
| Local typed helpers in failing tests | Slight duplication, but smallest safe change | Chosen |

Rationale: only three test files fail, so locality minimizes blast radius and avoids speculative abstractions.

### Decision: Mock Framer Motion by contract shape, not broad casts

| Option | Tradeoff | Decision |
|---|---|---|
| `as any` / variadic mocks | Fast, but hides overload/type regressions | Rejected |
| Narrow typed mocks for `ScrollMotionValues`, `MotionValue`, and `useTransform` overload actually used | Slightly more verbose, but preserves strictness | Chosen |

Rationale: current TS failure is caused by a mock signature that no longer matches Framer Motion 12 overloads.

### Decision: Remove unused runtime bindings instead of suppressing warnings

| Option | Tradeoff | Decision |
|---|---|---|
| Inline disable comments | Zero code movement, but weakens quality gates | Rejected |
| Delete unused bindings/imports only | No behavior change, keeps rules intact | Chosen |

Rationale: proposal explicitly forbids rule relaxation.

## Data Flow

Test runner → mocked hooks/types → component/hook render → assertions

Lint/TS gates read only the scoped files:

`test mocks` → `component tests` → `eslint/tsc pass`
`runtime hygiene` → `eslint warnings removed`

## File Changes

| File | Action | Description |
|---|---|---|
| `components/__tests__/CameraScroll.test.tsx` | Modify | Add typed `useScroll` return helper and typed `useTransform` mock that handles the range-based overload used by the component. Replace `mockReturnValue(1 as any)` with a motion-value-shaped stub. |
| `components/__tests__/StickyHeader.test.tsx` | Modify | Replace `any` props in mocked `motion.*` components with `PropsWithChildren` + narrowed HTML/motion prop types; type the `useScroll`/`useTransform` mocks to match consumed members only. |
| `hooks/__tests__/useActiveSection.test.ts` | Modify | Type the observer callback as `IntersectionObserverCallback` and feed it real `IntersectionObserverEntry`-shaped objects via a small factory. |
| `components/CameraScroll.tsx` | Modify | Remove unused `framesUrls` state while preserving image preload flow. |
| `components/StickyHeader.tsx` | Modify | Remove unused `AnimatePresence` import. |
| `hooks/useActiveSection.ts` | Modify | Remove unused `observers` binding; keep single observer behavior unchanged. |

## Interfaces / Contracts

```ts
type MockMotionValue<T> = Pick<MotionValue<T>, 'get' | 'on'>;

type MockUseTransform = {
  <O>(value: MotionValue<number>, input: number[], output: O[]): MotionValue<O>;
};
```

Guideline: prefer `Pick<>`/narrow interfaces over full concrete library implementations. Only the members consumed by the SUT/tests should be mocked.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | Existing component/hook expectations still render and update | Keep current Vitest/RTL coverage; no new behavior assertions needed beyond existing tests |
| Integration | Quality gates | Run `npm run lint` then `npx tsc --noEmit`; optionally run the three scoped tests if typing changes need behavioral confirmation |
| E2E | None | Not required; no product workflow changes |

## Migration / Rollout

No migration required.

## Open Questions

- [ ] None blocking. If a typed `MotionValue` stub proves too noisy, use a single local helper file under `components/__tests__/` only if duplication becomes unreadable during implementation.
