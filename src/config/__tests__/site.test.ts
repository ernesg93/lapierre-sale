import { describe, expect, it } from 'vitest';

import {
  FINAL_GALLERY_MAX_IMAGES,
  buildPurchaseMessage,
  buildPurchaseWhatsAppUrl,
  buildWhatsAppUrl,
  siteConfig,
  whatsappUrl,
} from '../site';

describe('site config whatsapp helpers', () => {
  it('exposes a centralized sale contract and root aliases', () => {
    expect(siteConfig.sale.productName).toBe('Lapierre Pro Race');
    expect(siteConfig.sale.productName).toBe(siteConfig.name);
    expect('price' in siteConfig.sale).toBe(false);
    expect('price' in siteConfig).toBe(false);

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

    expect(siteConfig.sale.specs.frame).toContain('Carbono');
    expect(siteConfig.sale.specs.frame).toContain('M (17")');
    expect(siteConfig.sale.specs.brakes).toContain('Shimano');
    expect(siteConfig.sale.specs.wheels).toContain('DT Swiss 29"');
    expect(siteConfig.sale.specs.wheels).toContain('Ratchet');
    expect(siteConfig.sale.specs.drivetrain).toContain('SRAM 1x10');
    expect(siteConfig.sale.specs.condition).toBe('Como nueva');
    expect(siteConfig.sale.specs.usage).toContain('Poco uso');
    expect(siteConfig.sale.hero.detailLines.at(-1)).toBe(
      'Está como nueva, con poco uso y publicada con información clara.',
    );
    expect(siteConfig.sale.purchaseOptions).toHaveLength(3);
    siteConfig.sale.purchaseOptions.forEach((option) => {
      expect('price' in option).toBe(false);
    });
  });

  it('keeps metadata and purchase options free of price-adjacent copy', () => {
    const publicCopy = [
      siteConfig.sale.metadata.title,
      siteConfig.sale.metadata.description,
      ...siteConfig.sale.purchaseOptions.flatMap((option) => [
        option.title,
        option.description,
        option.badge ?? '',
      ]),
    ].join(' ');

    expect(siteConfig.sale.metadata.title).toBe(
      'Lapierre Pro Race | Bici híbrida de carbono',
    );
    expect(siteConfig.sale.purchaseOptions.map((option) => option.title)).toEqual([
      'Quiero verla en persona',
      'Quiero hablar sobre esta bici',
      'Necesito hacer una consulta',
    ]);
    expect(publicCopy).not.toMatch(/\$|\b(?:usd|eur|free)\b|sin costo|reserv(?:a|ar|ación)/i);
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

    expect(buildPurchaseMessage(option.title)).toBe(`Hola, vi la ${siteConfig.sale.productName} en la web y me interesa avanzar por: ${option.title}.`);
    expect(buildPurchaseMessage(option.title)).not.toMatch(/\$|\b(?:usd|eur|free)\b/i);
  });

  it('builds purchase whatsapp urls from centralized sale message composition', () => {
    const option = siteConfig.sale.purchaseOptions[1];
    const message = buildPurchaseMessage(option.title);

    expect(buildPurchaseWhatsAppUrl(option.title)).toBe(buildWhatsAppUrl(message));
    expect(message).toContain('Lapierre Pro Race');
    expect(message).not.toMatch(/pack|accesorios|usd/i);
  });

  it('exposes the final gallery copy and keeps the configured set within the supported cap', () => {
    expect(siteConfig.sale.finalGallery.title).toBe('Una bici así se entiende mejor cuando la mirás de cerca.');
    expect(siteConfig.sale.finalGallery.subtitle).toBe('Deslizá, abrí las fotos y terminá de verla como corresponde.');
    expect(siteConfig.sale.finalGallery.images.length).toBeGreaterThanOrEqual(1);
    expect(siteConfig.sale.finalGallery.images.length).toBeLessThanOrEqual(FINAL_GALLERY_MAX_IMAGES);
  });

  it('defines final gallery images with the expected render metadata contract', () => {
    expect(siteConfig.sale.finalGallery.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: expect.any(String),
          alt: expect.any(String),
          width: expect.any(Number),
          height: expect.any(Number),
          orientation: expect.stringMatching(/^(landscape|portrait)$/),
        }),
      ]),
    );
  });
});
