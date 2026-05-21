import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import CameraScrollAnimator from '../CameraScrollAnimator';

const onChangeCallbacks: Array<(progress: number) => void> = [];

vi.mock('framer-motion', () => ({
  useScroll: () => ({
    scrollYProgress: {
      on: (_event: string, cb: (progress: number) => void) => {
        onChangeCallbacks.push(cb);
        return () => {
          const index = onChangeCallbacks.indexOf(cb);
          if (index >= 0) onChangeCallbacks.splice(index, 1);
        };
      },
    },
  }),
}));

class MockImage {
  static created: MockImage[] = [];
  onload: null | (() => void) = null;
  onerror: null | (() => void) = null;
  decoding = '';
  width = 1600;
  height = 900;

  private _src = '';
  set src(value: string) {
    this._src = value;
    MockImage.created.push(this);
  }
  get src() {
    return this._src;
  }
}

describe('CameraScrollAnimator', () => {
  const fetchMock = vi.fn();
  const drawImageMock = vi.fn();
  const requestAnimationFrameMock = vi.fn<(cb: FrameRequestCallback) => number>();
  const performanceMarkMock = vi.fn();
  const performanceMeasureMock = vi.fn();
  let rafQueue: FrameRequestCallback[] = [];

  beforeEach(() => {
    onChangeCallbacks.length = 0;
    MockImage.created = [];

    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ['/f0.webp', '/f1.webp', '/f2.webp'],
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('Image', MockImage as unknown as typeof Image);

    requestAnimationFrameMock.mockReset();
    requestAnimationFrameMock.mockImplementation((cb: FrameRequestCallback) => {
      cb(16);
      return 1;
    });
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock as unknown as typeof requestAnimationFrame);
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('performance', {
      mark: performanceMarkMock,
      measure: performanceMeasureMock,
    } as unknown as Performance);

    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    const context2d = {
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      drawImage: drawImageMock,
    };

    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context2d as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 1200,
      height: 800,
      top: 0,
      left: 0,
      right: 1200,
      bottom: 800,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    rafQueue = [];
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('paints first frame before subsequent frames finish loading', async () => {
    render(<CameraScrollAnimator />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/frames/manifest.json'));
    expect(MockImage.created).toHaveLength(1);

    await act(async () => {
      MockImage.created[0]?.onload?.();
    });

    await waitFor(() => expect(drawImageMock).toHaveBeenCalledTimes(1));
    expect(MockImage.created.length).toBeGreaterThan(1);
  });

  it('emits hero readiness marks and measures after manifest and first frame load', async () => {
    render(<CameraScrollAnimator />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/frames/manifest.json'));
    expect(performanceMarkMock).toHaveBeenCalledWith('lapierre:hero-animator-mounted');

    await act(async () => {
      MockImage.created[0]?.onload?.();
    });

    await waitFor(() => {
      expect(performanceMarkMock).toHaveBeenCalledWith('lapierre:hero-manifest-loaded');
      expect(performanceMarkMock).toHaveBeenCalledWith('lapierre:hero-first-frame-painted');
    });

    expect(performanceMeasureMock).toHaveBeenCalledWith(
      'lapierre:hero-manifest-delay',
      'lapierre:app-init',
      'lapierre:hero-manifest-loaded',
    );
    expect(performanceMeasureMock).toHaveBeenCalledWith(
      'lapierre:hero-first-frame-delay',
      'lapierre:app-init',
      'lapierre:hero-first-frame-painted',
    );
  });

  it('keeps rendering non-blocking on slow network by drawing nearest loaded frame', async () => {
    render(<CameraScrollAnimator />);

    await waitFor(() => expect(MockImage.created).toHaveLength(1));
    await act(async () => {
      MockImage.created[0]?.onload?.();
    });
    await waitFor(() => expect(drawImageMock.mock.calls.length).toBeGreaterThanOrEqual(1));
    const drawCallsBeforeScroll = drawImageMock.mock.calls.length;

    await act(async () => {
      onChangeCallbacks.forEach((cb) => cb(0.9));
    });

    expect(drawImageMock.mock.calls.length).toBeGreaterThanOrEqual(drawCallsBeforeScroll);
    const lastDrawCall = drawImageMock.mock.calls.at(-1);
    expect(lastDrawCall?.[0]).toBe(MockImage.created[0]);
  });

  it('skips runtime loading when reduced motion is enabled', async () => {
    const matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia });

    render(<CameraScrollAnimator />);

    await waitFor(() => expect(matchMedia).toHaveBeenCalled());
    expect(fetchMock).not.toHaveBeenCalled();
    expect(requestAnimationFrameMock).not.toHaveBeenCalled();
  });

  it('marks cache eviction when progressive loading exceeds cache budget', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => Array.from({ length: 12 }, (_, index) => `/f${index}.webp`),
    });

    render(<CameraScrollAnimator />);

    await waitFor(() => expect(MockImage.created.length).toBeGreaterThan(0));

    let pointer = 0;
    const resolveAllCreatedImages = async () => {
      while (pointer < MockImage.created.length) {
        const image = MockImage.created[pointer++];
        await act(async () => {
          image.onload?.();
        });
      }
    };

    await resolveAllCreatedImages();

    await act(async () => {
      onChangeCallbacks.forEach((cb) => cb(0.95));
    });

    await resolveAllCreatedImages();

    await waitFor(() => {
      expect(performanceMarkMock).toHaveBeenCalledWith('lapierre:hero-cache-evicted');
    });
  });

  it('coalesces high-frequency scroll updates into a single pending rAF draw', async () => {
    requestAnimationFrameMock.mockImplementation((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });

    render(<CameraScrollAnimator />);

    await waitFor(() => expect(MockImage.created).toHaveLength(1));
    await act(async () => {
      MockImage.created[0]?.onload?.();
    });

    await waitFor(() => expect(rafQueue.length).toBeGreaterThan(0));
    await act(async () => {
      const firstFrame = rafQueue.shift();
      firstFrame?.(16);
    });

    requestAnimationFrameMock.mockClear();

    await act(async () => {
      onChangeCallbacks.forEach((cb) => cb(0.2));
      onChangeCallbacks.forEach((cb) => cb(0.6));
      onChangeCallbacks.forEach((cb) => cb(0.9));
    });

    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      const frame = rafQueue.shift();
      frame?.(16);
    });

    expect(drawImageMock.mock.calls.length).toBeGreaterThanOrEqual(2);
    const lastDrawCall = drawImageMock.mock.calls.at(-1);
    expect(lastDrawCall?.[0]).toBe(MockImage.created[0]);
  });

  it('redraws a valid frame after viewport resize', async () => {
    requestAnimationFrameMock.mockImplementation((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });

    render(<CameraScrollAnimator />);

    await waitFor(() => expect(MockImage.created).toHaveLength(1));
    await act(async () => {
      MockImage.created[0]?.onload?.();
    });

    await waitFor(() => expect(rafQueue.length).toBeGreaterThan(0));
    await act(async () => {
      const initialFrame = rafQueue.shift();
      initialFrame?.(16);
    });

    const drawCallsBeforeResize = drawImageMock.mock.calls.length;

    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });

    await act(async () => {
      const resizeFrame = rafQueue.shift();
      resizeFrame?.(16);
    });

    expect(drawImageMock.mock.calls.length).toBeGreaterThan(drawCallsBeforeResize);
    const lastDrawCall = drawImageMock.mock.calls.at(-1);
    expect(lastDrawCall?.[0]).toBe(MockImage.created[0]);
  });
});
