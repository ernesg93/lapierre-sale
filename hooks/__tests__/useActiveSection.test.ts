import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useActiveSection from '../useActiveSection';

describe('useActiveSection Hook', () => {
  let observerCallback: (entries: any[]) => void;
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: any) {
        observerCallback = callback;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    });
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
      observerCallback([
        { target: { id: 'section1' }, isIntersecting: true, intersectionRatio: 0.6 }
      ]);
    });

    expect(result.current).toBe('section1');
  });

  it('should choose the section with the highest intersection ratio', () => {
    const { result } = renderHook(() => useActiveSection(['section1', 'section2']));
    
    act(() => {
      observerCallback([
        { target: { id: 'section1' }, isIntersecting: true, intersectionRatio: 0.4 },
        { target: { id: 'section2' }, isIntersecting: true, intersectionRatio: 0.8 }
      ]);
    });

    expect(result.current).toBe('section2');
  });
});
