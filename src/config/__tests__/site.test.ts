import { describe, expect, it } from 'vitest';

import { buildWhatsAppUrl, siteConfig, whatsappUrl } from '../site';

describe('site config whatsapp helpers', () => {
  it('builds whatsapp url with default configured message', () => {
    expect(buildWhatsAppUrl()).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
    );
    expect(whatsappUrl).toBe(buildWhatsAppUrl());
  });

  it('builds whatsapp url with custom encoded message', () => {
    const message = 'Hola Lapierre, ¿sigue disponible?';

    expect(buildWhatsAppUrl(message)).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
    );
  });

  it('encodes spaces and special characters consistently', () => {
    const message = 'Hola + Lapierre / talla M & envío a Barcelona';

    expect(buildWhatsAppUrl(message)).toBe(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
    );
  });
});
