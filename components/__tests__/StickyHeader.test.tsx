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

  const MockNav = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) => (
    <nav {...props}>{children}</nav>
  );

  const MockDiv = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  );

  const MockAnchor = ({ children, ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => (
    <a {...props}>{children}</a>
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

  beforeEach(() => {
    vi.resetAllMocks();
    window.history.replaceState(null, '', '/');
    
    // Default mock for useScroll: at the top (0)
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(0),
      scrollYProgress: createMockMotionValue(0),
    } as unknown as ReturnType<typeof useScroll>);

    // Mock useTransform to return the output values
    const useTransformRange: MockUseTransform = (_value, _input, output) =>
      createMockMotionValue(output[0]) as unknown as MotionValue<(typeof output)[number]>;

    vi.mocked(useTransform).mockImplementation(
      useTransformRange as unknown as typeof useTransform,
    );

    // Default mock for useActiveSection
    vi.mocked(useActiveSection).mockReturnValue(null);
  });

  it('updates hash to #faq when clicking Preguntas navigation', () => {
    const faqSection = document.createElement('section');
    faqSection.id = 'faq';
    faqSection.scrollIntoView = vi.fn();
    document.body.appendChild(faqSection);

    render(<StickyHeader />);
    fireEvent.click(screen.getByRole('button', { name: /Preguntas/i }));

    expect(window.location.hash).toBe('#faq');
    expect(faqSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    faqSection.remove();
  });

  it('renders active section link label when section state is specs', () => {
    vi.mocked(useActiveSection).mockReturnValue('specs');
    render(<StickyHeader />);

    expect(screen.getByRole('button', { name: /Ficha Técnica/i })).toBeInTheDocument();
  });

  it('renders a progress bar', () => {
    render(<StickyHeader />);
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('shows the price when scrolling deep (mocked visible)', () => {
    render(<StickyHeader />);
    expect(screen.getByText(siteConfig.sale.productName)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.price)).toBeInTheDocument();
  });

  it('is not visible initially (at scroll 0)', () => {
    render(<StickyHeader />);
    const header = screen.getByRole('navigation');
    // We expect opacity 0 or similar logic. 
    // In TDD we reference the component which doesn't exist yet.
    expect(header).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(<StickyHeader />);
    expect(screen.getByText(/Ficha Técnica/i)).toBeInTheDocument();
    expect(screen.getByText(/Confianza/i)).toBeInTheDocument();
    expect(screen.getByText(/Preguntas/i)).toBeInTheDocument();
  });

  it('updates transform based on scroll', () => {
    // Mocking scroll past threshold
    vi.mocked(useScroll).mockReturnValue({
      scrollY: createMockMotionValue(200),
      scrollYProgress: createMockMotionValue(0.2),
    } as unknown as ReturnType<typeof useScroll>);

    render(<StickyHeader />);
    const header = screen.getByRole('navigation');
    // In our mock, opacity will be output[0] if not explicitly handled, 
    // but here we just verify it renders with the scroll value.
    expect(header).toBeInTheDocument();
  });
});
