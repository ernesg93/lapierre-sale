import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useActiveSection from '../useActiveSection';

describe('useActiveSection Hook', () => {
  let observerCallback: IntersectionObserverCallback;
  let observerOptions: IntersectionObserverInit | undefined;
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  const createObserverEntry = (
    sectionId: string,
    intersectionRatio: number,
    isIntersecting = true,
  ): IntersectionObserverEntry => {
    const target = document.createElement('section');
    target.id = sectionId;

    return {
      boundingClientRect: new DOMRectReadOnly(),
      intersectionRatio,
      intersectionRect: new DOMRectReadOnly(),
      isIntersecting,
      rootBounds: null,
      target,
      time: Date.now(),
    };
  };

  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];

      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        observerCallback = callback;
        observerOptions = options;
      }

      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
      takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('uses internal observer threshold policy', () => {
    renderHook(() => useActiveSection(['section1', 'section2']));

    expect(observerOptions?.threshold).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  it('should return null initially', () => {
    const { result } = renderHook(() => useActiveSection(['section1', 'section2']));
    expect(result.current).toBeNull();
  });

  it('should update active section when an element becomes visible', () => {
    const { result } = renderHook(() => useActiveSection(['section1', 'section2']));
    
    // Simulate intersection observer finding section1
    act(() => {
      observerCallback(
        [createObserverEntry('section1', 0.6)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe('section1');
  });

  it('should choose the section with the highest intersection ratio', () => {
    const { result } = renderHook(() => useActiveSection(['section1', 'section2']));
    
    act(() => {
      observerCallback(
        [createObserverEntry('section1', 0.4), createObserverEntry('section2', 0.8)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBe('section2');
  });

  it('keeps null when observer reports no intersecting entries', () => {
    const { result } = renderHook(() => useActiveSection(['section1', 'section2']));

    act(() => {
      observerCallback(
        [createObserverEntry('section1', 0.2, false), createObserverEntry('section2', 0.7, false)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current).toBeNull();
  });

  it('does not recreate observer when only legacy threshold arg changes', () => {
    const ids = ['section1', 'section2'];
    const { rerender } = renderHook(({ threshold }) => (useActiveSection as unknown as (sectionIds: string[], threshold?: number) => string | null)(ids, threshold), {
      initialProps: { threshold: 0.5 },
    });

    const disconnectCallsBeforeRerender = mockDisconnect.mock.calls.length;
    rerender({ threshold: 0.75 });

    expect(mockDisconnect.mock.calls.length).toBe(disconnectCallsBeforeRerender);
  });
});
