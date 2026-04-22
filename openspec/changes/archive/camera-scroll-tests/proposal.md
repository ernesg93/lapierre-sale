# Proposal: CameraScroll Tests

**ID**: camera-scroll-tests
**Status**: proposed
**Intent**: Implement unit and integration tests for the CameraScroll component, covering asset loading, progress tracking, and narrative overlays.

## Scope
- `components/__tests__/CameraScroll.test.tsx` [NEW]

## Approach
- Mock `fetch` for manifest loading.
- Mock `Image` to simulate image preloading.
- Mock `framer-motion` to control scroll progress.
- Test loading states, error handling, and overlay transitions.

## Risks
- Canvas rendering is hard to test in JSDOM; we will focus on the orchestration logic and overlay visibility rather than pixel-perfect canvas drawing.
