import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurchaseConfig from '../PurchaseConfig';
import * as siteModule from '@/src/config/site';

vi.mock('@/src/config/site', async () => {
  const actual = await vi.importActual<typeof import('@/src/config/site')>(
    '@/src/config/site',
  );
  const legacyPrices = ['FREE', '$ 850', 'FREE'];

  return {
    ...actual,
    siteConfig: {
      ...actual.siteConfig,
      sale: {
        ...actual.siteConfig.sale,
        purchaseOptions: actual.siteConfig.sale.purchaseOptions.map(
          (option, index) => ({ ...option, price: legacyPrices[index] }),
        ),
      },
    },
  };
});

describe('PurchaseConfig', () => {
  it('renders the single-bike conversation paths title', () => {
    render(<PurchaseConfig />);
    expect(screen.getByText('Cómo avanzar con esta bici')).toBeInTheDocument();
    expect(
      screen.getByText(
        /tres formas directas de hablar por la misma lapierre pro race y resolver tus dudas por whatsapp\./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders all three same-bike conversation paths', () => {
    render(<PurchaseConfig />);

    const options = siteModule.siteConfig.sale.purchaseOptions;
    expect(options).toHaveLength(3);

    options.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
      expect(screen.getByText(option.description)).toBeInTheDocument();
    });

    expect(screen.queryByText(/\$\s*850|\bfree\b|sin costo|reserv(?:a|ar|ación)/i)).not.toBeInTheDocument();
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
      expect(decodeURIComponent(link.getAttribute('href') ?? '')).toContain(
        `me interesa avanzar por: ${option.title}.`,
      );
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
