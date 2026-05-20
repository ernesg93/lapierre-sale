'use client';

import { useReportWebVitals } from 'next/web-vitals';

type MetricRecord = {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
};

declare global {
  interface Window {
    __LAPIERRE_PERF__?: MetricRecord[];
  }
}

const handleWebVitals: Parameters<typeof useReportWebVitals>[0] = (metric) => {
  const record: MetricRecord = {
    id: String(metric.id),
    name: String(metric.name),
    value: Number(metric.value),
    delta: Number(metric.delta),
    rating: metric.rating,
    navigationType: metric.navigationType,
  };

  if (typeof window !== 'undefined') {
    window.__LAPIERRE_PERF__ = [...(window.__LAPIERRE_PERF__ ?? []), record];
  }
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
  return null;
}
