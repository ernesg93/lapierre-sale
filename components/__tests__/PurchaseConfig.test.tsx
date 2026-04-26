import React from 'react';
import { describe, it, expect, vi } from 'vitest';
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
    expect(screen.getByText('Solo Bici')).toBeInTheDocument();
    expect(screen.getByText('Pack Completo')).toBeInTheDocument();
    expect(screen.getByText('Accesorios por separado')).toBeInTheDocument();
  });

  it('builds CTA whatsapp links from centralized base and dynamic messages', () => {
    const buildSpy = vi.spyOn(siteModule, 'buildWhatsAppUrl');

    render(<PurchaseConfig />);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining(`https://wa.me/${siteModule.siteConfig.whatsappNumber}`));
    });

    expect(buildSpy).toHaveBeenCalledTimes(3);
    expect(buildSpy).toHaveBeenCalledWith('Hola, vi la Lapierre en la web y me interesa la opción: Solo Bici.');
    expect(buildSpy).toHaveBeenCalledWith('Hola, vi la Lapierre en la web y me interesa la opción: Pack Completo.');

    expect(links[0]).toHaveAttribute(
      'href',
      siteModule.buildWhatsAppUrl('Hola, vi la Lapierre en la web y me interesa la opción: Solo Bici.'),
    );
    expect(links[1]).toHaveAttribute(
      'href',
      siteModule.buildWhatsAppUrl('Hola, vi la Lapierre en la web y me interesa la opción: Pack Completo.'),
    );

    buildSpy.mockRestore();
  });
});
