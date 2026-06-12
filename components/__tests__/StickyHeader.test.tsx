import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react';
import StickyHeader from '../StickyHeader';
import useActiveSection from '../../hooks/useActiveSection';
import { siteConfig } from '@/src/config/site';

// Mocking useActiveSection
vi.mock('../../hooks/useActiveSection', () => ({
  default: vi.fn(),
}));

// Mocking framer-motion
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
    const serialized = Object.fromEntries(
      Object.entries(style).map(([key, value]) => [key, getMotionValue(value)]),
    ) as React.CSSProperties;

    if ('scaleX' in serialized) {
      const scaleX = serialized.scaleX;
      delete serialized.scaleX;
      serialized.transform = `${serialized.transform ?? ''} scaleX(${scaleX})`.trim();
    }

    return serialized;
  };

  const MockNav = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
    <nav {...props} style={serializeStyle(props.style)}>{children}</nav>
  );

  const MockDiv = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props} style={serializeStyle(props.style)}>{children}</div>
  );

  const MockAnchor = ({ children, ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => (
    <a {...props} style={serializeStyle(props.style)}>{children}</a>
  );

  const MockSpan = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
    <span {...props}>{children}</span>
  );

  return {
    ...actual,
    useScroll: vi.fn(),
    useTransform: vi.fn(),
    motion: {
      nav: MockNav,
      div: MockDiv,
      a: MockAnchor,
      span: MockSpan,
    },
  };
});

describe('StickyHeader Component', () => {
  type MockMotionValue<T> = Pick<MotionValue<T>, 'get' | 'on'>;

  const createMockMotionValue = <T,>(value: T): MockMotionValue<T> => ({
    get: vi.fn(() => value) as unknown as MockMotionValue<T>['get'],
    on: vi.fn(() => vi.fn()) as unknown as MockMotionValue<T>['on'],
  });

  type MockUseTransform = {
    <O>(value: MotionValue<number>, input: number[], output: O[]): MotionValue<O>;
  };

  const resolveTransformValue = <O,>(source: number, input: number[], output: O[]) => {
    if (source <= input[0]) {
      return output[0];
    }

    for (let i = 1; i < input.length; i += 1) {
      if (source <= input[i]) {
        return output[i];
      }
    }

    return output[output.length - 1];
  };

  beforeEach(() => {
    vi.resetAllMocks();
    window.history.replaceState(null, '', '/');
    
    // Default mock for useScroll: at the top (0)
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(0),
      scrollYProgress: createMockMotionValue(0),
    } as unknown as ReturnType<typeof useScroll>);

    // Mock useTransform to return the output values
    const useTransformRange: MockUseTransform = (value, input, output) =>
      createMockMotionValue(resolveTransformValue(value.get(), input, output)) as unknown as MotionValue<(typeof output)[number]>;

    vi.mocked(useTransform).mockImplementation(
      useTransformRange as unknown as typeof useTransform,
    );

    // Default mock for useActiveSection
    vi.mocked(useActiveSection).mockReturnValue(null);
  });

  it('renders semantic same-page links for internal navigation', () => {
    render(<StickyHeader />);

    expect(screen.getByRole('link', { name: /Ficha Técnica/i })).toHaveAttribute('href', '#specs');
    expect(screen.getByRole('link', { name: /Confianza/i })).toHaveAttribute('href', '#trust');
    expect(screen.getByRole('link', { name: /Preguntas/i })).toHaveAttribute('href', '#faq');
  });

  it('exposes visible-focus utility classes on header navigation links', () => {
    render(<StickyHeader />);

    const specs = screen.getByRole('link', { name: /Ficha Técnica/i });
    specs.focus();

    expect(document.activeElement).toBe(specs);
    expect(specs.className).toContain('focus-visible:outline-2');
    expect(specs.className).toContain('focus-visible:outline-offset-2');
  });

  it('moves focus to destination when navigation is programmatic', () => {
    const faqSection = document.createElement('section');
    faqSection.id = 'faq';
    faqSection.scrollIntoView = vi.fn();
    document.body.appendChild(faqSection);

    render(<StickyHeader />);
    const link = screen.getByRole('link', { name: /Preguntas/i });
    fireEvent.click(link);

    expect(window.location.hash).toBe('#faq');
    expect(faqSection).toHaveAttribute('tabindex', '-1');
    expect(document.activeElement).toBe(faqSection);

    faqSection.remove();
  });

  it('highlights only the active section from hook output', () => {
    vi.mocked(useActiveSection).mockReturnValue('specs');
    render(<StickyHeader />);

    const specs = screen.getByRole('link', { name: /Ficha Técnica/i });
    const trust = screen.getByRole('link', { name: /Confianza/i });
    const faq = screen.getByRole('link', { name: /Preguntas/i });

    expect(specs.className).toContain('text-[#A855F7]');
    expect(trust.className).toContain('text-slate-600');
    expect(faq.className).toContain('text-slate-600');
  });

  it('does not highlight any navigation item when hook returns null', () => {
    vi.mocked(useActiveSection).mockReturnValue(null);
    render(<StickyHeader />);

    const navButtons = [
      screen.getByRole('link', { name: /Ficha Técnica/i }),
      screen.getByRole('link', { name: /Confianza/i }),
      screen.getByRole('link', { name: /Preguntas/i }),
    ];

    navButtons.forEach((button) => {
      const classTokens = button.className.split(/\s+/);
      expect(button.className).toContain('text-slate-600');
      expect(classTokens).not.toContain('text-[#A855F7]');
    });
  });

  it('renders progress bar with scroll-derived scale', () => {
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(200),
      scrollYProgress: createMockMotionValue(0.2),
    } as unknown as ReturnType<typeof useScroll>);

    render(<StickyHeader />);
    expect(screen.getByTestId('progress-bar')).toHaveStyle({ transform: 'scaleX(0.2)' });
  });

  it('shows product and CTA when scrolling deep', () => {
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(200),
      scrollYProgress: createMockMotionValue(0.2),
    } as unknown as ReturnType<typeof useScroll>);

    render(<StickyHeader />);
    expect(screen.getByText(siteConfig.sale.productName)).toBeInTheDocument();
    expect(screen.getByText('$ 850')).toBeInTheDocument();

    const cta = screen.getByRole('link', { name: /Contactar/i });
    expect(cta).toHaveStyle({ opacity: '1', scale: '1' });
  });

  it('keeps hidden CTA out of keyboard focus when not visible', () => {
    render(<StickyHeader />);
    const cta = screen.getByText('Contactar').closest('a') as HTMLAnchorElement;
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('tabindex', '-1');
    expect(cta).toHaveAttribute('aria-hidden', 'true');
  });

  it('is not visible initially (at scroll 0)', () => {
    render(<StickyHeader />);
    const header = screen.getByRole('navigation');
    expect(header).toHaveStyle({ opacity: '0' });
  });

  it('calls useActiveSection with canonical section ids only', () => {
    render(<StickyHeader />);

    expect(useActiveSection).toHaveBeenCalledWith(['config', 'specs', 'trust', 'faq']);
    expect(useActiveSection).toHaveBeenCalledTimes(1);
  });

  it('updates transform based on scroll', () => {
    // Mocking scroll past threshold
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(200),
      scrollYProgress: createMockMotionValue(0.2),
    } as unknown as ReturnType<typeof useScroll>);

    render(<StickyHeader />);
    const header = screen.getByRole('navigation');
    expect(header).toHaveStyle({ opacity: '1' });
  });
});
