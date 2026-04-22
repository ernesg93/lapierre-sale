import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useScroll, useTransform } from 'framer-motion';
import CameraScroll from '../CameraScroll';

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
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => cb()));
    
    // Default mock for useScroll
    vi.mocked(useScroll).mockReturnValue({
      scrollYProgress: {
        get: vi.fn(() => 0),
        on: vi.fn(() => vi.fn()),
      },
    } as any);

    // Default mock for useTransform
    vi.mocked(useTransform).mockImplementation((value, input, output) => {
      return output[0];
    });
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

    expect(screen.getByText('Lapierre Híbrida Carbono')).toBeInTheDocument();
  });

  it('renders different overlays based on scroll progress', async () => {
    // Mocking useTransform to return 1 (visible) for all overlays
    vi.mocked(useTransform).mockReturnValue(1 as any);

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
    expect(screen.getByText(/Cuadro carbono/)).toBeInTheDocument();
    expect(screen.getByText(/Mantenimiento al día/)).toBeInTheDocument();
    expect(screen.getByText('Contactar por WhatsApp')).toBeInTheDocument();
  });
});
