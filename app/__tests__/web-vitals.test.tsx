import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

const useReportWebVitalsMock = vi.fn();

vi.mock('next/web-vitals', () => ({
  useReportWebVitals: useReportWebVitalsMock,
}));

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

describe('WebVitals integration', () => {
  beforeEach(() => {
    useReportWebVitalsMock.mockReset();
    window.__LAPIERRE_PERF__ = [];
  });

  it('registers a stable callback with useReportWebVitals', async () => {
    const mod = await import('@/components/WebVitals');

    render(<mod.WebVitals />);

    expect(useReportWebVitalsMock).toHaveBeenCalledTimes(1);
    expect(typeof useReportWebVitalsMock.mock.calls[0]?.[0]).toBe('function');
  });

  it('appends sanitized metric records into window perf buffer', async () => {
    const mod = await import('@/components/WebVitals');

    render(<mod.WebVitals />);

    const callback = useReportWebVitalsMock.mock.calls[0]?.[0] as (metric: {
      id: string;
      name: string;
      value: unknown;
      delta: unknown;
      rating: 'good' | 'needs-improvement' | 'poor';
      navigationType?: string;
    }) => void;

    callback({
      id: 'metric-1',
      name: 'LCP',
      value: '1234',
      delta: '50',
      rating: 'good',
      navigationType: 'navigate',
    });

    expect(window.__LAPIERRE_PERF__).toHaveLength(1);
    expect(window.__LAPIERRE_PERF__?.[0]).toEqual({
      id: 'metric-1',
      name: 'LCP',
      value: 1234,
      delta: 50,
      rating: 'good',
      navigationType: 'navigate',
    });
  });

  it('includes WebVitals from RootLayout while keeping server layout boundary', async () => {
    vi.doMock('@/components/WebVitals', () => ({
      WebVitals: () => <div data-testid="web-vitals-marker" />,
    }));

    const { default: RootLayout } = await import('../layout');
    const { getByTestId } = render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );

    expect(getByTestId('web-vitals-marker')).toBeInTheDocument();
  });
});
