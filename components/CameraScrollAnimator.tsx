"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import {
  MAX_CACHE_FRAMES,
  buildProgressiveLoadQueue,
  evictDistantFrameIndexes,
  getNearestLoadedFrameIndex,
  toFrameIndex,
} from "@/src/utils/heroFrameCache";

export function calculateImageDrawProps(canvasWidth: number, canvasHeight: number, imgWidth: number, imgHeight: number) {
  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;
  let drawWidth;
  let drawHeight;
  let offsetX;
  let offsetY;

  if (imgRatio > canvasRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  const isMobile = canvasWidth < canvasHeight;
  const yOffset = isMobile ? canvasHeight * 0.18 : 0;

  return { drawWidth, drawHeight, offsetX, offsetY, yOffset };
}

export default function CameraScrollAnimator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const frameUrlsRef = useRef<string[]>([]);
  const previousProgressRef = useRef(0);
  const pendingFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const mark = (name: string) => {
      if (typeof performance === "undefined" || typeof performance.mark !== "function") return;
      performance.mark(name);
    };

    const measure = (name: string, start: string, end: string) => {
      if (typeof performance === "undefined" || typeof performance.measure !== "function") return;

      try {
        performance.measure(name, start, end);
      } catch {
        // Ignore missing start/end marks in constrained environments.
      }
    };

    mark("lapierre:hero-animator-mounted");

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const loadFrame = (index: number) => {
      if (frameCacheRef.current.has(index)) {
        return Promise.resolve(frameCacheRef.current.get(index) ?? null);
      }

      const urls = frameUrlsRef.current;
      const url = urls[index];
      if (!url) return Promise.resolve(null);

      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = url;
        img.onload = () => {
          frameCacheRef.current.set(index, img);
          resolve(img);
        };
        img.onerror = () => resolve(null);
      });
    };

    const drawFrame = (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const loadedIndexes = [...frameCacheRef.current.keys()].sort((a, b) => a - b);
      const nearestIndex = getNearestLoadedFrameIndex(targetIndex, loadedIndexes);
      if (nearestIndex === null) return;

      const img = frameCacheRef.current.get(nearestIndex);
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { drawWidth, drawHeight, offsetX, offsetY, yOffset } = calculateImageDrawProps(
        rect.width,
        rect.height,
        img.width,
        img.height,
      );

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, offsetX, offsetY + yOffset, drawWidth, drawHeight);
    };

    const scheduleDraw = (frameIndex: number) => {
      pendingFrameRef.current = frameIndex;
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(pendingFrameRef.current);
        rafIdRef.current = null;
      });
    };

    const loadWindow = async (frameIndex: number, direction: -1 | 1) => {
      const totalFrames = frameUrlsRef.current.length;
      const queue = buildProgressiveLoadQueue({
        currentIndex: frameIndex,
        totalFrames,
        direction,
      });

      for (const index of queue) {
        await loadFrame(index);
      }

      const loadedIndexes = [...frameCacheRef.current.keys()].sort((a, b) => a - b);
      const evicted = evictDistantFrameIndexes({
        loadedIndexes,
        keepIndexes: queue,
        maxFrames: MAX_CACHE_FRAMES,
      });

      for (const index of evicted) {
        frameCacheRef.current.delete(index);
      }

      if (evicted.length > 0) {
        mark("lapierre:hero-cache-evicted");
      }

      scheduleDraw(frameIndex);
    };

    async function loadManifestAndImages() {
      try {
        const res = await fetch("/frames/manifest.json");
        if (!res.ok) return;

        const urls: string[] = await res.json();
        if (!urls.length) return;

        frameUrlsRef.current = urls;
        mark("lapierre:hero-manifest-loaded");
        measure("lapierre:hero-manifest-delay", "lapierre:app-init", "lapierre:hero-manifest-loaded");

        await loadFrame(0);
        mark("lapierre:hero-first-frame-painted");
        measure("lapierre:hero-first-frame-delay", "lapierre:app-init", "lapierre:hero-first-frame-painted");
        scheduleDraw(0);

        void loadWindow(0, 1);
      } catch {
        frameUrlsRef.current = [];
      }
    }

    loadManifestAndImages();

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const totalFrames = frameUrlsRef.current.length;
      if (totalFrames === 0) return;

      const frameIndex = toFrameIndex(progress, totalFrames);
      const direction: -1 | 1 = progress >= previousProgressRef.current ? 1 : -1;
      previousProgressRef.current = progress;

      scheduleDraw(frameIndex);
      void loadWindow(frameIndex, direction);
    });

    const onResize = () => scheduleDraw(pendingFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      unsubscribe();
      window.removeEventListener("resize", onResize);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />
      </div>
    </div>
  );
}
