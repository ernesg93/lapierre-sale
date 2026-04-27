import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

import { metadata } from '../layout';
import { siteConfig } from '@/src/config/site';

describe('layout metadata', () => {
  it('uses centralized sale title and description for SEO/OG/Twitter', () => {
    expect(metadata.title).toBe(siteConfig.sale.metadata.title);
    expect(metadata.description).toBe(siteConfig.sale.metadata.description);

    expect(metadata.openGraph?.title).toBe(siteConfig.sale.metadata.title);
    expect(metadata.openGraph?.description).toBe(siteConfig.sale.metadata.description);
    expect(metadata.twitter?.title).toBe(siteConfig.sale.metadata.title);
    expect(metadata.twitter?.description).toBe(siteConfig.sale.metadata.description);
  });

  it('uses centralized sale identity for siteName and OG image', () => {
    expect(metadata.openGraph?.siteName).toBe(siteConfig.sale.productName);

    const images = metadata.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : undefined;
    if (!image || typeof image === 'string' || image instanceof URL || !('url' in image)) {
      throw new Error('Expected object-based openGraph image metadata');
    }

    expect(image.alt).toBe(siteConfig.sale.productName);
    expect(image.url).toBe(siteConfig.sale.metadata.ogImage);
  });
});
