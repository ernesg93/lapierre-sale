"use client";

import { useRef, useState } from 'react';

import Image from 'next/image';

import GalleryLightbox from '@/components/GalleryLightbox';
import { FINAL_GALLERY_MAX_IMAGES, siteConfig } from '@/src/config/site';

const galleryCardWidths = {
  landscape: 'w-[min(82vw,30rem)]',
  portrait: 'w-[min(68vw,24rem)]',
} as const;

export default function FinalAspirationalGallery() {
  const gallery = siteConfig.sale.finalGallery;
  const images = gallery.images.slice(0, FINAL_GALLERY_MAX_IMAGES);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (images.length === 0) {
    return null;
  }

  const activeImage = activeIndex === null ? null : images[activeIndex];

  const restoreFocus = () => {
    triggerRef.current?.focus();
  };

  return (
    <section
      aria-labelledby="final-gallery-title"
      className="border-t border-slate-200 bg-slate-50 py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#A855F7]">
            Cierre visual
          </p>
          <h2
            id="final-gallery-title"
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            {gallery.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {gallery.subtitle}
          </p>
        </div>

        <div
          aria-label={gallery.title}
          className="-mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none]"
        >
          <div className="flex snap-x snap-mandatory gap-5">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                className={`group shrink-0 snap-start rounded-[2rem] border border-slate-200 bg-white p-3 text-left shadow-sm transition-transform hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none ${galleryCardWidths[image.orientation]} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A855F7]`}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
              >
                <div className="relative flex h-[26rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(216,180,254,0.3),_rgba(248,250,252,0.95)_58%,_rgba(255,255,255,1)_100%)]">
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-contain"
                    height={image.height}
                    priority={index === 0}
                    src={image.src}
                    width={image.width}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeImage ? (
        <GalleryLightbox
          image={activeImage}
          onClose={() => setActiveIndex(null)}
          onRestoreFocus={restoreFocus}
        />
      ) : null}
    </section>
  );
}
