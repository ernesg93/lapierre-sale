import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { buildWhatsAppUrl, siteConfig, whatsappUrl } from '@/src/config/site';

describe('Footer Component', () => {
  it('renders the main title', () => {
    render(<Footer />);
    expect(screen.getByText(siteConfig.sale.productName)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.footer.primaryCtaLabel)).toBeInTheDocument();
  });

  it('keeps heading aligned with centralized product name even if footer heading drifts', () => {
    const footerMutable = siteConfig.sale.footer as unknown as { heading: string };
    const originalHeading = footerMutable.heading;
    footerMutable.heading = 'Título local desalineado';

    render(<Footer />);

    expect(screen.getByText(siteConfig.sale.productName)).toBeInTheDocument();
    expect(screen.queryByText('Título local desalineado')).not.toBeInTheDocument();

    footerMutable.heading = originalHeading;
  });

  it('uses centralized whatsapp url contract for CTA links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link').filter((link) =>
      link.getAttribute('href')?.includes('wa.me/'),
    );

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', whatsappUrl);
    expect(links[1]).toHaveAttribute('href', buildWhatsAppUrl());
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
