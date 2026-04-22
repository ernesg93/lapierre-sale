import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mocking components to keep the test focused on the layout
vi.mock('@/components/CameraScroll', () => ({ default: () => <div data-testid="camera-scroll" /> }));
vi.mock('@/components/StickyHeader', () => ({ default: () => <div data-testid="sticky-header" /> }));

describe('Home Page', () => {
  it('renders StickyHeader and main sections', () => {
    render(<Home />);
    expect(screen.getByTestId('sticky-header')).toBeInTheDocument();
    expect(screen.getByTestId('camera-scroll')).toBeInTheDocument();
  });
});
