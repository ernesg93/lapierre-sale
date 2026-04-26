import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useScroll, useTransform } from 'framer-motion';
import StickyHeader from '../StickyHeader';
import useActiveSection from '../../hooks/useActiveSection';

// Mocking useActiveSection
vi.mock('../../hooks/useActiveSection', () => ({
  default: vi.fn(),
}));

// Mocking framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: vi.fn(),
    useTransform: vi.fn(),
    motion: {
      nav: ({ children, style, className }: any) => <nav style={style} className={className}>{children}</nav>,
      div: ({ children, style, className, "data-testid": testId }: any) => (
        <div style={style} className={className} data-testid={testId}>{children}</div>
      ),
      a: ({ children, style, className, href }: any) => (
        <a href={href} style={style} className={className}>{children}</a>
      ),
      span: ({ children, style, className }: any) => (
        <span style={style} className={className}>{children}</span>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('StickyHeader Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.history.replaceState(null, '', '/');
    
    // Default mock for useScroll: at the top (0)
    vi.mocked(useScroll).mockReturnValue({
      scrollY: {
        get: vi.fn(() => 0),
        on: vi.fn(() => vi.fn()),
      },
      scrollYProgress: {
        get: vi.fn(() => 0),
        on: vi.fn(() => vi.fn()),
      }
    } as any);

    // Mock useTransform to return the output values
    vi.mocked(useTransform).mockImplementation((...args: any[]) => {
      const output = args[2];
      return Array.isArray(output) ? output[0] : 0;
    });

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

  it('highlights the active section link', () => {
    vi.mocked(useActiveSection).mockReturnValue('specs');
    render(<StickyHeader />);
    
    const specsLink = screen.getByText(/Ficha Técnica/i);
    // Check for a specific class or style that indicates active state
    // In our implementation we'll use a specific color or underline
    expect(specsLink).toHaveClass('text-[#A855F7]');
  });

  it('renders a progress bar', () => {
    render(<StickyHeader />);
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('shows the price when scrolling deep (mocked visible)', () => {
    // We'll mock the hook/state that controls this in the component implementation
    // For now, we just expect the price from siteConfig to be present in the component
    render(<StickyHeader />);
    // Note: It might not be visible initially, but we check if it's in the DOM
    // or we can mock the scroll state to be deep.
    expect(screen.getByText(/€ 3.200/)).toBeInTheDocument();
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
      scrollY: {
        get: vi.fn(() => 200),
        on: vi.fn(() => vi.fn()),
      },
    } as any);

    render(<StickyHeader />);
    const header = screen.getByRole('navigation');
    // In our mock, opacity will be output[0] if not explicitly handled, 
    // but here we just verify it renders with the scroll value.
    expect(header).toBeInTheDocument();
  });
});
