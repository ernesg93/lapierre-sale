import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechSpecs from '../TechSpecs';

describe('TechSpecs Component', () => {
  it('renders the section title', () => {
    render(<TechSpecs />);
    expect(screen.getByText('Ficha Técnica')).toBeInTheDocument();
  });

  it('renders all key specifications', () => {
    render(<TechSpecs />);
    
    // Check for labels
    expect(screen.getByText('Cuadro')).toBeInTheDocument();
    expect(screen.getByText('Grupo')).toBeInTheDocument();
    expect(screen.getByText('Ruedas')).toBeInTheDocument();
    expect(screen.getByText('Frenos')).toBeInTheDocument();
    expect(screen.getByText('Talla')).toBeInTheDocument();
    expect(screen.getByText('Peso aprox.')).toBeInTheDocument();

    // Check for values
    expect(screen.getByText('Carbono Lapierre Advanced Composite')).toBeInTheDocument();
    expect(screen.getByText('Shimano GRX 1x11 (Híbrido configurado)')).toBeInTheDocument();
    expect(screen.getByText('DT Swiss G1800 Spline')).toBeInTheDocument();
    expect(screen.getByText('M (Ideal para 1.70m - 1.82m)')).toBeInTheDocument();
  });

  it('renders the status detail value', () => {
    render(<TechSpecs />);
    expect(screen.getByText(/Mecánica 10\/10\. Detalles cosméticos menores/)).toBeInTheDocument();
  });
});
