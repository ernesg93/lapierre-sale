import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurchaseConfig from '../PurchaseConfig';
import * as siteModule from '@/src/config/site';

describe('PurchaseConfig', () => {
  it('renders the single-bike conversation paths title', () => {
    render(<PurchaseConfig />);
    expect(screen.getByText('Cómo avanzar con esta bici')).toBeInTheDocument();
    expect(
      screen.getByText(
        /tres formas directas de hablar por la misma lapierre pro race, con reserva directa o consultas sin costo\./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders all three same-bike conversation paths', () => {
    render(<PurchaseConfig />);

    siteModule.siteConfig.sale.purchaseOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
    });

    expect(screen.getAllByText('$ 850')).toHaveLength(1);
    expect(screen.getAllByText('FREE')).toHaveLength(2);
  });

  it('builds CTA whatsapp links from centralized base and dynamic messages', () => {
    render(<PurchaseConfig />);
    const links = screen.getAllByRole('link');
    const options = siteModule.siteConfig.sale.purchaseOptions;

    expect(links).toHaveLength(options.length);
    links.forEach((link, index) => {
      const option = options[index];

      expect(link).toHaveAttribute(
        'href',
        siteModule.buildPurchaseWhatsAppUrl(option.title),
      );
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining(`https://wa.me/${siteModule.siteConfig.whatsappNumber}`),
      );
      expect(link).toHaveAttribute('href', expect.not.stringContaining('$ 850'));
    });
  });
});
