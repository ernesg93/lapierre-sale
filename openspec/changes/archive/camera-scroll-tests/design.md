# Design: CameraScroll Tests

**Change**: camera-scroll-tests

## Implementation Strategy

### Mocking Infrastructure
- **fetch**: Use `vi.spyOn(global, 'fetch')`.
- **Image**: Mock `global.Image` to call `onload` on `src` assignment.
- **framer-motion**:
    - Mock `useScroll` to return a `scrollYProgress` object with a `get` method and an `on` method (event emitter).
    - Mock `useTransform` to return values calculated from a mocked `MotionValue`.

### Test Cases
1. **Error Case**: `fetch.mockRejectedValue`.
2. **Progress Case**: Simulate batches of `Image.onload`.
3. **Ready Case**: Trigger 100% progress and verify `CameraScrollContent` is rendered.
4. **Scroll Case**: Manually call the callback registered via `scrollYProgress.on('change', ...)` with different progress values and verify overlay visibility.

## File Changes
- `components/__tests__/CameraScroll.test.tsx`
