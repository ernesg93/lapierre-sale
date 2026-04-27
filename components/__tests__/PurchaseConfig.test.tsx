import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurchaseConfig from '../PurchaseConfig';
import * as siteModule from '@/src/config/site';

describe('PurchaseConfig', () => {
  it('renders the delivery options title', () => {
    render(<PurchaseConfig />);
    expect(screen.getByText('Opciones de Entrega')).toBeInTheDocument();
  });

  it('renders all three base options', () => {
    render(<PurchaseConfig />);

    siteModule.siteConfig.sale.purchaseOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
    });
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
    });
  });
});
