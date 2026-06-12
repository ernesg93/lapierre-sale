import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';

import FinalAspirationalGallery from '../FinalAspirationalGallery';
import { FINAL_GALLERY_MAX_IMAGES, siteConfig, type GalleryImage } from '@/src/config/site';

vi.mock('next/image', () => ({
  default: ({ alt, src, priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => (
    React.createElement('img', {
      alt,
      'data-priority': _priority ? 'true' : 'false',
      src: typeof src === 'string' ? src : '',
      ...props,
    })
  ),
}));

describe('FinalAspirationalGallery', () => {
  const originalImages = [...siteConfig.sale.finalGallery.images];
  const firstImage = siteConfig.sale.finalGallery.images[0];
  const secondImage = siteConfig.sale.finalGallery.images[1];

  const getTriggerByAlt = (alt: string) => screen.getByRole('button', { name: alt });

  beforeEach(() => {
    const mutableImages = siteConfig.sale.finalGallery.images as unknown as typeof originalImages;
    mutableImages.splice(0, mutableImages.length, ...originalImages);
  });

  it('renders the approved gallery copy and image trigger buttons', () => {
    render(<FinalAspirationalGallery />);

    expect(screen.getByRole('heading', { name: siteConfig.sale.finalGallery.title })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.finalGallery.subtitle)).toBeInTheDocument();

    const triggerButtons = siteConfig.sale.finalGallery.images.map((image) => getTriggerByAlt(image.alt));
    expect(triggerButtons).toHaveLength(siteConfig.sale.finalGallery.images.length);
    expect(triggerButtons[0]).toHaveAccessibleName(siteConfig.sale.finalGallery.images[0].alt);
  });

  it('caps the rendered image triggers at eight items even if config drifts higher', () => {
    const mutableImages = siteConfig.sale.finalGallery.images as unknown as Array<(typeof originalImages)[number]>;
    const overflowImages: GalleryImage[] = Array.from({ length: FINAL_GALLERY_MAX_IMAGES + 2 }, (_, index) => ({
      src: `/gallery/overflow-${index + 1}.svg`,
      alt: `Overflow gallery image ${index + 1}`,
      width: 1200,
      height: index % 2 === 0 ? 900 : 1500,
      orientation: index % 2 === 0 ? 'landscape' : 'portrait',
    }));

    mutableImages.splice(0, mutableImages.length, ...overflowImages);

    render(<FinalAspirationalGallery />);

    expect(overflowImages.slice(0, FINAL_GALLERY_MAX_IMAGES).map((image) => getTriggerByAlt(image.alt))).toHaveLength(FINAL_GALLERY_MAX_IMAGES);
    expect(screen.queryByRole('button', { name: 'Overflow gallery image 10' })).not.toBeInTheDocument();
  });

  it('keeps browsing image-led without arrows or captions', () => {
    render(<FinalAspirationalGallery />);

    const gallery = screen.getByRole('region', { name: siteConfig.sale.finalGallery.title });
    const images = within(gallery).getAllByRole('img');
    expect(images).toHaveLength(siteConfig.sale.finalGallery.images.length);

    expect(screen.queryByRole('button', { name: /next|previous|siguiente|anterior/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/caption|leyenda|foto \\d/i)).not.toBeInTheDocument();
  });

  it('renders a scroll-snap strip with orientation-aware frames for mixed gallery assets', () => {
    render(<FinalAspirationalGallery />);

    const firstTrigger = getTriggerByAlt(firstImage.alt);
    const secondTrigger = getTriggerByAlt(secondImage.alt);
    const strip = firstTrigger.parentElement;
    const firstFrame = within(firstTrigger).getByRole('img', { name: firstImage.alt }).parentElement;
    const secondFrame = within(secondTrigger).getByRole('img', { name: secondImage.alt }).parentElement;

    expect(strip).not.toBeNull();
    expect(strip?.className).toContain('snap-x');
    expect(strip?.className).toContain('snap-mandatory');
    expect(firstTrigger.className).toContain('snap-start');
    expect(secondTrigger.className).toContain('snap-start');
    expect(firstTrigger.className).toContain('w-[min(82vw,30rem)]');
    expect(secondTrigger.className).toContain('w-[min(68vw,24rem)]');
    expect(firstFrame?.className).toContain('h-[26rem]');
    expect(secondFrame?.className).toContain('h-[26rem]');
  });

  it('keeps gallery triggers and the lightbox close control visibly focusable for keyboard users', () => {
    render(<FinalAspirationalGallery />);

    const trigger = getTriggerByAlt(firstImage.alt);
    expect(trigger.className).toContain('focus-visible:outline-2');
    expect(trigger.className).toContain('focus-visible:outline-offset-4');
    expect(trigger.className).toContain('focus-visible:outline-[#A855F7]');

    fireEvent.click(trigger);

    const closeButton = screen.getByRole('button', { name: /cerrar galería/i });
    expect(closeButton.className).toContain('focus-visible:outline-2');
    expect(closeButton.className).toContain('focus-visible:outline-offset-4');
    expect(closeButton.className).toContain('focus-visible:outline-white');
  });

  it('keeps reduced-motion behavior restrained without adding autoplay or looping controls', () => {
    render(<FinalAspirationalGallery />);

    const trigger = getTriggerByAlt(firstImage.alt);
    expect(trigger.className).toContain('motion-reduce:transform-none');
    expect(trigger.className).toContain('motion-reduce:transition-none');

    fireEvent.click(trigger);

    const closeButton = screen.getByRole('button', { name: /cerrar galería/i });
    expect(closeButton.className).toContain('motion-reduce:transition-none');
    expect(screen.queryByRole('button', { name: /next|previous|siguiente|anterior/i })).not.toBeInTheDocument();
  });

  it('keeps the lightbox photo-only and preserves the selected image ratio with object-contain', () => {
    render(<FinalAspirationalGallery />);

    fireEvent.click(getTriggerByAlt(secondImage.alt));

    const dialog = screen.getByRole('dialog', { name: secondImage.alt });
    const lightboxImage = within(dialog).getByRole('img', { name: secondImage.alt });

    expect(lightboxImage.className).toContain('object-contain');
    expect(within(dialog).queryByText(/caption|leyenda|foto \d/i)).not.toBeInTheDocument();
    expect(within(dialog).queryByText(secondImage.alt)).not.toBeInTheDocument();
  });

  it('opens the selected image in a lightbox and moves focus to the close control', () => {
    render(<FinalAspirationalGallery />);

    fireEvent.click(getTriggerByAlt(firstImage.alt));

    const dialog = screen.getByRole('dialog', { name: firstImage.alt });
    const closeButton = within(dialog).getByRole('button', { name: /cerrar galería/i });

    expect(within(dialog).getByRole('img', { name: firstImage.alt })).toBeInTheDocument();
    expect(closeButton).toHaveFocus();
  });

  it('closes the lightbox from the close button and returns focus to the invoking trigger', () => {
    render(<FinalAspirationalGallery />);

    const trigger = getTriggerByAlt(firstImage.alt);
    fireEvent.click(trigger);

    fireEvent.click(screen.getByRole('button', { name: /cerrar galería/i }));

    expect(screen.queryByRole('dialog', { name: firstImage.alt })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes the lightbox when the backdrop is activated and returns focus to the invoking trigger', () => {
    render(<FinalAspirationalGallery />);

    const trigger = getTriggerByAlt(secondImage.alt);
    fireEvent.click(trigger);

    fireEvent.click(screen.getByTestId('gallery-lightbox-backdrop'));

    expect(screen.queryByRole('dialog', { name: secondImage.alt })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes the lightbox on Escape and returns focus to the invoking trigger', () => {
    render(<FinalAspirationalGallery />);

    const trigger = getTriggerByAlt(secondImage.alt);
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: secondImage.alt })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
