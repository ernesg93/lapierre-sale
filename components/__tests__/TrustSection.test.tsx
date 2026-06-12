import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrustSection from '../TrustSection';

describe('TrustSection Component', () => {
  it('renders the main title', () => {
    render(<TrustSection />);
    expect(screen.getByText(/Compra con/)).toBeInTheDocument();
    expect(screen.getByText('Confianza')).toBeInTheDocument();
  });

  it('renders the verification badge', () => {
    render(<TrustSection />);
    expect(screen.getByText('Venta directa y transparente')).toBeInTheDocument();
  });

  it('renders all trust badges', () => {
    render(<TrustSection />);
    expect(screen.getByText('Una sola bici real, sin packs ni variantes')).toBeInTheDocument();
    expect(screen.getByText('Poco uso y estado como nueva')).toBeInTheDocument();
    expect(screen.getByText('La ves en persona y preguntás todo')).toBeInTheDocument();
    expect(screen.getByText('Coordinación directa por WhatsApp')).toBeInTheDocument();
  });
});
