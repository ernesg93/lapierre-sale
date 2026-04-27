import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import CameraScroll, { calculateImageDrawProps } from '../CameraScroll';
import { siteConfig } from '@/src/config/site';

// Mocking framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: vi.fn(),
    useTransform: vi.fn(),
  };
});

describe('CameraScroll Component', () => {
  type MockMotionValue<T> = Pick<MotionValue<T>, 'get' | 'on'>;

  const createMockMotionValue = <T,>(value: T): MockMotionValue<T> => ({
    get: vi.fn(() => value) as unknown as MockMotionValue<T>['get'],
    on: vi.fn(() => vi.fn()) as unknown as MockMotionValue<T>['on'],
  });

  type MockUseTransform = {
    <O>(value: MotionValue<number>, input: number[], output: O[]): MotionValue<O>;
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => cb()));
    
    // Default mock for useScroll
    vi.mocked(useScroll).mockReturnValue({
      scrollYProgress: createMockMotionValue(0),
    } as unknown as ReturnType<typeof useScroll>);

    // Default mock for useTransform
    const useTransformRange: MockUseTransform = (_value, _input, output) =>
      createMockMotionValue(output[0]) as unknown as MotionValue<(typeof output)[number]>;

    vi.mocked(useTransform).mockImplementation(
      useTransformRange as unknown as typeof useTransform,
    );
  });

  it('shows error message if manifest fails to load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Fetch failed')));
    
    render(<CameraScroll />);
    
    await waitFor(() => {
      expect(screen.getByText('Falta generar el manifest de imágenes.')).toBeInTheDocument();
    });
  });

  it('shows progress bar while loading images', async () => {
    const manifest = ['/f1.jpg', '/f2.jpg'];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifest),
    }));

    vi.stubGlobal('Image', class {
      onload = () => {};
      set src(val: string) { setTimeout(() => this.onload(), 0); }
      decoding = 'async';
    });

    render(<CameraScroll />);

    await waitFor(() => {
      expect(screen.getByText(/Preparando experiencia/)).toBeInTheDocument();
    });
  });

  it('renders content after images are loaded', async () => {
    const manifest = ['/f1.jpg'];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifest),
    }));

    vi.stubGlobal('Image', class {
      onload = () => {};
      set src(val: string) { setTimeout(() => this.onload(), 0); }
      decoding = 'async';
    });

    render(<CameraScroll />);

    await waitFor(() => {
      expect(screen.queryByText(/Preparando experiencia/)).not.toBeInTheDocument();
    }, { timeout: 3000 });

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.sale.productName }),
    ).toBeInTheDocument();
  });

  it('uses centralized product name for hero heading even if hero title drifts', async () => {
    const heroMutable = siteConfig.sale.hero as unknown as { title: string };
    const originalHeroTitle = heroMutable.title;
    heroMutable.title = 'Título desalineado temporal';

    const manifest = ['/f1.jpg'];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifest),
    }));

    vi.stubGlobal('Image', class {
      onload = () => {};
      set src(_value: string) {
        setTimeout(() => this.onload(), 0);
      }
      decoding = 'async';
    });

    render(<CameraScroll />);

    await waitFor(() => {
      expect(screen.queryByText(/Preparando experiencia/)).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.sale.productName }),
    ).toBeInTheDocument();

    heroMutable.title = originalHeroTitle;
  });

  it('renders different overlays based on scroll progress', async () => {
    // Mocking useTransform to return visible motion values for all overlays
    const visibleTransform: MockUseTransform = <O,>() =>
      createMockMotionValue(1 as unknown as O) as unknown as MotionValue<O>;
    vi.mocked(useTransform).mockImplementation(
      visibleTransform as unknown as typeof useTransform,
    );

    const manifest = ['/f1.jpg'];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifest),
    }));
    vi.stubGlobal('Image', class { 
      onload = () => {}; 
      set src(s: string) { setTimeout(() => this.onload(), 0); }
      decoding = 'async';
    });

    render(<CameraScroll />);

    await waitFor(() => {
      expect(screen.queryByText(/Preparando experiencia/)).not.toBeInTheDocument();
    });

    // Verify all narrative overlays are potentially visible
    expect(screen.getByText(siteConfig.sale.hero.claims.join(' | '))).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.hero.detailLines[3])).toBeInTheDocument();
    expect(screen.getByText('Contactar por WhatsApp')).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Contactar por WhatsApp sobre la ${siteConfig.sale.productName}`),
    ).toHaveAttribute('href');
  });

  it('calculates vertical offset for portrait aspect ratio (mobile)', () => {
    const canvasWidth = 400;
    const canvasHeight = 800; // Portrait
    const imgWidth = 1000;
    const imgHeight = 600; // Landscape bike
    
    const props = calculateImageDrawProps(canvasWidth, canvasHeight, imgWidth, imgHeight);
    
    // On mobile (portrait), we expect yOffset to be defined and positive
    expect(props.yOffset).toBeGreaterThan(0);
  });
});
