import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders the main title', () => {
    render(<Footer />);
    expect(screen.getByText('Lapierre Híbrida Carbono')).toBeInTheDocument();
  });

  it('contains correctly formatted whatsapp links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    // Primary CTA and secondary text link
    const waLinks = links.filter(l => l.getAttribute('href')?.includes('wa.me/5356793586'));
    expect(waLinks.length).toBe(2);
  });

  it('renders navigation buttons', () => {
    render(<Footer />);
    expect(screen.getByText('Configuración')).toBeInTheDocument();
    expect(screen.getByText('Ficha Técnica')).toBeInTheDocument();
    expect(screen.getByText('Confianza')).toBeInTheDocument();
  });

  it('renders the legal notice', () => {
    render(<Footer />);
    expect(screen.getByText(/Venta entre particulares/)).toBeInTheDocument();
  });
});
