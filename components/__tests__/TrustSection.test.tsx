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
    expect(screen.getByText('Verificado para venta local')).toBeInTheDocument();
  });

  it('renders all trust badges', () => {
    render(<TrustSection />);
    expect(screen.getByText('Factura original disponible')).toBeInTheDocument();
    expect(screen.getByText('Nº de serie verificable')).toBeInTheDocument();
    expect(screen.getByText('Prueba en zona pública')).toBeInTheDocument();
    expect(screen.getByText('Pago en efectivo o transferencia segura')).toBeInTheDocument();
  });
});
