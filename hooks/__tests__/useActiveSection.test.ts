import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useActiveSection from '../useActiveSection';

describe('useActiveSection Hook', () => {
  let observerCallback: IntersectionObserverCallback;
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

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
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
});
