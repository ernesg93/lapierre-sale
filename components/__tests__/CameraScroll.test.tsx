import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CameraScroll from '../CameraScroll';
import { siteConfig } from '@/src/config/site';
import { whatsappUrl } from '@/src/config/site';

vi.mock('../CameraScrollAnimator', () => {
  return {
    default: () => <div data-testid="camera-scroll-animator" aria-hidden="true" />,
  };
});

describe('CameraScroll Component', () => {
  it('renders server hero shell with heading, copy and primary CTA', () => {
    render(<CameraScroll />);

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.sale.productName }),
    ).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.hero.claims.join(' | '))).toBeInTheDocument();

    const contactCta = screen.getByRole('link', {
      name: `Contactar por WhatsApp sobre la ${siteConfig.sale.productName}`,
    });
    expect(contactCta).toHaveAttribute('href', whatsappUrl);

    expect(screen.getByRole('link', { name: /Ver ficha técnica/i })).toHaveAttribute('href', '#specs');
  });

  it('keeps shell content operable when client animator is unavailable', async () => {
    vi.doMock('../CameraScrollAnimator', () => ({ default: () => null }));
    const { default: CameraScrollWithoutAnimator } = await import('../CameraScroll');

    render(<CameraScrollWithoutAnimator />);

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.sale.productName }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver ficha técnica/i })).toHaveAttribute('href', '#specs');
    expect(
      screen.getByRole('link', {
        name: `Contactar por WhatsApp sobre la ${siteConfig.sale.productName}`,
      }),
    ).toHaveAttribute('href', whatsappUrl);
  });

  it('renders animator boundary as non-focusable visual layer', () => {
    render(<CameraScroll />);

    expect(screen.getByTestId('camera-scroll-animator')).toHaveAttribute('aria-hidden', 'true');
  });
});
