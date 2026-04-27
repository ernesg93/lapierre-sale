"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { whatsappUrl, siteConfig } from "@/src/config/site";

export default function CameraScroll() {
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [manifestError, setManifestError] = useState(false);

  // Cargar manifest y luego pre-cargar imágenes
  useEffect(() => {
    async function loadManifestAndImages() {
      try {
        const res = await fetch("/frames/manifest.json");
        if (!res.ok) throw new Error("Manifest not found");
        const urls: string[] = await res.json();
        
        if (urls.length === 0) {
          throw new Error("No frames found in manifest");
        }
        // Preload images in batches to avoid connection overload
        const imgCache: HTMLImageElement[] = [];
        let loadedCount = 0;
        const BATCH_SIZE = 10;
        
        for (let i = 0; i < urls.length; i += BATCH_SIZE) {
          const batchUrls = urls.slice(i, i + BATCH_SIZE);
          await Promise.all(
            batchUrls.map((url, batchIndex) => {
              const globalIndex = i + batchIndex; // O(1) — sin indexOf
              return new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.decoding = "async";
                img.src = url;
                img.onload = () => {
                  loadedCount++;
                  setLoadingProgress(Math.round((loadedCount / urls.length) * 100));
                  resolve(img);
                };
                img.onerror = () => {
                  loadedCount++;
                  setLoadingProgress(Math.round((loadedCount / urls.length) * 100));
                  resolve(img);
                };
              }).then(img => {
                imgCache[globalIndex] = img;
              });
            })
          );
        }
        
        setLoadedImages(imgCache.filter(Boolean));
      } catch (err) {
        console.error(err);
        setManifestError(true);
      }
    }
    loadManifestAndImages();
  }, []);

  if (manifestError) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-900">
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">Aviso del Sistema</p>
          <p>Falta generar el manifest de imágenes.</p>
          <code className="bg-slate-200 p-2 rounded block">npm run predev</code>
        </div>
      </div>
    );
  }

  // Loader de progreso
  if (loadingProgress < 100) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-[#A855F7] transition-all duration-300 ease-out" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-slate-600 font-medium tracking-wide">
          Preparando experiencia... {loadingProgress}%
        </p>
      </div>
    );
  }

  return <CameraScrollContent loadedImages={loadedImages} />;
}

export function calculateImageDrawProps(canvasWidth: number, canvasHeight: number, imgWidth: number, imgHeight: number) {
  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;
  let drawWidth, drawHeight, offsetX, offsetY;

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

  // Ajuste para mobile: si es portrait, desplazamos hacia abajo
  const isMobile = canvasWidth < canvasHeight;
  const yOffset = isMobile ? canvasHeight * 0.18 : 0;

  return { drawWidth, drawHeight, offsetX, offsetY, yOffset };
}

// WhatsApp URL generada desde siteConfig centralizado

// Componente separado para que useScroll siempre encuentre su target ref montado en el DOM
function CameraScrollContent({ loadedImages }: { loadedImages: HTMLImageElement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Motor de Render Canvas
  useEffect(() => {
    if (!canvasRef.current || loadedImages.length === 0) return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Configuramos resolución dpr con limite en móvil (max 2)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Calculamos frame index actual según el progreso
      const progress = scrollYProgress.get();
      const numFrames = loadedImages.length;
      if (numFrames === 0) return;
      
      let frameIndex = Math.floor(progress * numFrames);
      if (frameIndex >= numFrames) frameIndex = numFrames - 1;

      const img = loadedImages[frameIndex];
      if (img) {
        const { drawWidth, drawHeight, offsetX, offsetY, yOffset } = calculateImageDrawProps(
          rect.width,
          rect.height,
          img.width,
          img.height
        );

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, offsetX, offsetY + yOffset, drawWidth, drawHeight);
      }
    };

    // Render inicial
    requestAnimationFrame(render);

    // Escuchar cambios de scroll para re-renderizar solo cuando es necesario
    const unsubscribe = scrollYProgress.on("change", () => requestAnimationFrame(render));
    
    // Re-renderizar cuando cambia el tamaño para que se re-escale bien
    window.addEventListener("resize", render);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", render);
    };
  }, [loadedImages, scrollYProgress]);

  // Transiciones de overlays según el scroll
  const op1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [20, -20]);
  
  const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [20, -20]);

  const op3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [20, -20]);

  const op4 = useTransform(scrollYProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.85, 1], [20, 0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Contenedor súper alto para que haya scroll suficiente
    <div ref={containerRef} style={{ position: "relative" }} className="relative w-full h-[400vh] bg-[#F8FAFC]">
      {/* Contenedor Sticky para el canvas y los overlays */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Canvas de alto rendimiento */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />

        {/* OVERLAYS NARRATIVOS */}
        
        {/* OVERLAY 1: 0% - 15% */}
        <motion.div 
          style={{ opacity: op1, y: y1 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0 p-6 text-center"
        >
          <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-sm border border-slate-200 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4 select-none">
              Lapierre Híbrida Carbono
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-6 text-balance select-none">
              Gravel & Urbano | {'<'} 1 año | Estado 8/10
            </p>
            <div className="pointer-events-auto">
              <button 
                onClick={() => scrollToSection('config')}
                className="text-[#A855F7] font-semibold hover:text-[#9333EA] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#A855F7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                Ver configuración →
              </button>
            </div>
          </div>
        </motion.div>

        {/* OVERLAY 2: 25% - 45% */}
        <motion.div 
          style={{ opacity: op2, y: y2 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0 p-6 text-center"
        >
          <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-sm border border-slate-200 max-w-lg">
            <p className="text-2xl md:text-4xl font-medium text-slate-900 text-balance leading-tight select-none">
              Cuadro carbono. <br/>Ruedas DT Swiss. <br/><span className="text-[#A855F7]">Frenos Shimano Hidráulicos.</span>
            </p>
          </div>
        </motion.div>

        {/* OVERLAY 3: 55% - 75% */}
        <motion.div 
          style={{ opacity: op3, y: y3 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0 p-6 text-center"
        >
          <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-sm border border-slate-200 max-w-lg">
            <p className="text-xl md:text-3xl font-medium text-slate-900 text-balance leading-snug select-none">
              Mantenimiento al día. Uso real, sin sorpresas.<br/>
              <span className="text-slate-500 text-lg md:text-xl block mt-2">Documentación original incluida.</span>
            </p>
          </div>
        </motion.div>

        {/* OVERLAY 4: 85% - 100% */}
        <motion.div 
          style={{ opacity: op4, y: y4 }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-40 p-6 text-center"
        >
          <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-md border border-slate-200 pointer-events-auto flex flex-col sm:flex-row gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contactar por WhatsApp sobre la ${siteConfig.name}`}
              className="px-8 py-4 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#A855F7]/30"
            >
              Contactar por WhatsApp
            </a>
            <button 
              onClick={() => scrollToSection('specs')}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-semibold border border-slate-200 transition-all hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Ver ficha técnica
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator (sutil) */}
        <motion.div 
          style={{ opacity: op1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-slate-400 text-sm tracking-widest uppercase">Scroll para descubrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
        </motion.div>

      </div>
    </div>
  );
}
