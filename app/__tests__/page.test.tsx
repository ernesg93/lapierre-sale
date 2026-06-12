import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../page';

const finalGalleryTitle = 'Una bici así se entiende mejor cuando la mirás de cerca.';
const finalGallerySubtitle = 'Deslizá, abrí las fotos y terminá de verla como corresponde.';

// Keep heavy scrollytelling sections mocked.
vi.mock('@/components/CameraScroll', () => ({ default: () => <div data-testid="camera-scroll" /> }));
vi.mock('@/components/PurchaseConfig', () => ({ default: () => <section aria-label="purchase-config" /> }));
vi.mock('@/components/TechSpecs', () => ({ default: () => <section id="specs" aria-label="tech-specs" /> }));
vi.mock('@/components/TrustSection', () => ({ default: () => <section id="trust" aria-label="trust-section" /> }));
vi.mock('@/components/Footer', () => ({ default: () => <footer aria-label="footer" /> }));
vi.mock('@/components/FinalAspirationalGallery', () => ({
  default: () => (
    <section aria-label="final-gallery">
      <h2>{finalGalleryTitle}</h2>
      <p>{finalGallerySubtitle}</p>
    </section>
  ),
}));

vi.mock('@/hooks/useActiveSection', () => ({
  default: () => null,
}));

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');

  const getMotionValue = (value: unknown) => {
    if (
      value &&
      typeof value === 'object' &&
      'get' in value &&
      typeof (value as { get: () => unknown }).get === 'function'
    ) {
      return (value as { get: () => unknown }).get();
    }

    return value;
  };

  const serializeStyle = (style: React.CSSProperties | undefined) => {
    if (!style) return style;

    return Object.fromEntries(
      Object.entries(style).map(([key, value]) => [key, getMotionValue(value)]),
    ) as React.CSSProperties;
  };

  return {
    ...actual,
    useScroll: () => ({
      scrollY: { get: () => 0, on: () => () => undefined },
      scrollYProgress: { get: () => 0, on: () => () => undefined },
    }),
    useTransform: (_value: { get: () => number }, _input: number[], output: number[]) => ({
      get: () => output[0],
      on: () => () => undefined,
    }),
    motion: {
      nav: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <nav {...props} style={serializeStyle(props.style)}>{children}</nav>
      ),
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div {...props} style={serializeStyle(props.style)}>{children}</div>
      ),
      a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a {...props} style={serializeStyle(props.style)}>{children}</a>
      ),
      span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
        <span {...props} style={serializeStyle(props.style)}>{children}</span>
      ),
    },
  };
});

describe('Home Page', () => {
  it('renders skip link as first focusable control and main landmark target', () => {
    render(<Home />);

    const skipLink = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');

    expect(screen.getByTestId('camera-scroll')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ficha Técnica/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Confianza/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Preguntas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Preguntas Frecuentes/i })).toBeInTheDocument();

    const faqDestinations = document.querySelectorAll('#faq');
    expect(faqDestinations).toHaveLength(1);
  });

  it('moves focus to #main-content when skip link is activated', () => {
    render(<Home />);

    const skipLink = screen.getByRole('link', { name: /saltar al contenido principal/i });
    const main = screen.getByRole('main');

    expect(document.activeElement).not.toBe(main);
    fireEvent.click(skipLink);

    expect(window.location.hash).toBe('#main-content');
    expect(document.activeElement).toBe(main);
  });

  it('renders the final gallery copy between FAQ and Footer', () => {
    render(<Home />);

    const faqHeading = screen.getByRole('heading', { name: /Preguntas Frecuentes/i });
    const galleryHeading = screen.getByRole('heading', { name: finalGalleryTitle });
    const gallerySubtitle = screen.getByText(finalGallerySubtitle);
    const footer = screen.getByRole('contentinfo', { name: /footer/i });

    expect(galleryHeading).toBeInTheDocument();
    expect(gallerySubtitle).toBeInTheDocument();
    expect(faqHeading.compareDocumentPosition(galleryHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(galleryHeading.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
