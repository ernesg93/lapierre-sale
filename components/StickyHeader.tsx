"use client";

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { siteConfig, whatsappUrl } from "@/src/config/site";
import useActiveSection from "@/hooks/useActiveSection";

export default function StickyHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  
  // Lista de secciones a observar
  const sectionIds = ["specs", "trust", "faq"];
  const activeSection = useActiveSection(sectionIds);
  
  // Aparece después de los 100px de scroll
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-20, 0]);

  // Detección de scroll profundo para mostrar CTA (ej: > 15%)
  // En un componente real usaríamos un listener o un hook, 
  // aquí lo simplificamos para que framer maneje la visibilidad
  const showCTA = useTransform(scrollYProgress, [0, 0.15, 0.16], [0, 0, 1]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const navLinks = [
    { name: "Ficha Técnica", id: "specs" },
    { name: "Confianza", id: "trust" },
    { name: "Preguntas", id: "faq" },
  ];

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl"
    >
      {/* Contenedor principal con Glassmorphism mejorado */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/40 shadow-[0_20px_50px_rgba(168,85,247,0.15)] rounded-2xl overflow-hidden">
        
        {/* Barra de progreso de lectura */}
        <motion.div 
          data-testid="progress-bar"
          style={{ scaleX: scrollYProgress }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A855F7] to-[#D8B4FE] origin-left"
        />

        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-slate-900 font-bold tracking-tight text-sm sm:text-lg whitespace-nowrap">
              {siteConfig.name}
            </span>
            
            {/* Precio dinámico (aparece al scrollear) */}
            <motion.span 
              style={{ opacity: showCTA }}
              className="hidden sm:inline-block text-[#A855F7] font-bold text-sm bg-[#A855F7]/10 px-2 py-0.5 rounded-lg border border-[#A855F7]/20"
            >
              {siteConfig.price}
            </motion.span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap relative group ${
                      isActive ? "text-[#A855F7]" : "text-slate-600 hover:text-[#A855F7]"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#A855F7] transition-transform origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* CTA Dinámico */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: showCTA, scale: showCTA }}
              className="px-4 py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-purple-200"
            >
              Contactar
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
