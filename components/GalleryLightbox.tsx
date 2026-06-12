"use client";

import { useEffect, useRef } from 'react';

import Image from 'next/image';

import type { GalleryImage } from '@/src/config/site';

type GalleryLightboxProps = {
  image: GalleryImage;
  onClose: () => void;
  onRestoreFocus: () => void;
};

export default function GalleryLightbox({ image, onClose, onRestoreFocus }: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onRestoreFocus();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onRestoreFocus]);

  const handleClose = () => {
    onRestoreFocus();
    onClose();
  };

  return (
    <div
      aria-label={image.alt}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/88 p-4 sm:p-8"
      data-testid="gallery-lightbox-backdrop"
      role="dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative flex w-full max-w-6xl flex-col items-end gap-4">
        <button
          ref={closeButtonRef}
          aria-label="Cerrar galería"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          type="button"
          onClick={handleClose}
        >
          Cerrar
        </button>

        <div className="flex h-[min(82vh,52rem)] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-slate-900/60 p-4 sm:p-6">
          <Image
            alt={image.alt}
            className="h-full w-full object-contain"
            height={image.height}
            src={image.src}
            width={image.width}
          />
        </div>
      </div>
    </div>
  );
}
