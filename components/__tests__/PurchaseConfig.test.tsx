import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurchaseConfig from '../PurchaseConfig';

describe('PurchaseConfig', () => {
  it('renders the delivery options title', () => {
    render(<PurchaseConfig />);
    expect(screen.getByText('Opciones de Entrega')).toBeInTheDocument();
  });

  it('renders all three base options', () => {
    render(<PurchaseConfig />);
    expect(screen.getByText('Solo Bici')).toBeInTheDocument();
    expect(screen.getByText('Pack Completo')).toBeInTheDocument();
    expect(screen.getByText('Accesorios por separado')).toBeInTheDocument();
  });

  it('uses the correct international phone number in whatsapp links', () => {
    render(<PurchaseConfig />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/5356793586'));
    });
  });
});
