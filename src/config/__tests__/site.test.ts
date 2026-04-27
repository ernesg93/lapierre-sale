import { describe, expect, it } from 'vitest';

import {
  buildPurchaseMessage,
  buildPurchaseWhatsAppUrl,
  buildWhatsAppUrl,
  siteConfig,
  whatsappUrl,
} from '../site';

describe('site config whatsapp helpers', () => {
  it('exposes a centralized sale contract and root aliases', () => {
    expect(siteConfig.sale.productName).toBe(siteConfig.name);
    expect(siteConfig.sale.price).toBe(siteConfig.price);

    expect(siteConfig.sale.metadata.title).toBe(siteConfig.title);
    expect(siteConfig.sale.metadata.description).toBe(siteConfig.description);
    expect(siteConfig.sale.metadata.ogImage).toBe(siteConfig.ogImage);

    expect(siteConfig.specs.frame).toBe(siteConfig.sale.specs.frame);
    expect(siteConfig.specs.brakes).toBe(siteConfig.sale.specs.brakes);
    expect(siteConfig.specs.wheels).toBe(siteConfig.sale.specs.wheels);
    expect(siteConfig.specs.drivetrain).toBe(siteConfig.sale.specs.drivetrain);
    expect(siteConfig.specs.condition).toBe(siteConfig.sale.specs.condition);
    expect(siteConfig.specs.usage).toBe(siteConfig.sale.specs.usage);

    expect(siteConfig.sale.techSpecs[0].value).toBe(siteConfig.sale.specs.frame);
    expect(siteConfig.sale.techSpecs[1].value).toBe(siteConfig.sale.specs.brakes);
    expect(siteConfig.sale.techSpecs[2].value).toBe(siteConfig.sale.specs.wheels);
    expect(siteConfig.sale.techSpecs[3].value).toBe(siteConfig.sale.specs.drivetrain);
    expect(siteConfig.sale.techSpecs[4].value).toBe(siteConfig.sale.specs.condition);
    expect(siteConfig.sale.techSpecs[5].value).toBe(siteConfig.sale.specs.usage);
  });

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

  it('composes purchase messages from centralized sale data', () => {
    const option = siteConfig.sale.purchaseOptions[0];

    expect(buildPurchaseMessage(option.title)).toBe(
      `Hola, vi la ${siteConfig.sale.productName} en la web y me interesa la opción: ${option.title}.`,
    );
  });

  it('builds purchase whatsapp urls from centralized sale message composition', () => {
    const option = siteConfig.sale.purchaseOptions[1];
    const message = buildPurchaseMessage(option.title);

    expect(buildPurchaseWhatsAppUrl(option.title)).toBe(buildWhatsAppUrl(message));
  });
});
