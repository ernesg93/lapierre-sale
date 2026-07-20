"use client";

import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { siteConfig, whatsappUrl } from "@/src/config/site";
import useActiveSection from "@/hooks/useActiveSection";
import { navigateToSection, type SectionTargetId } from "@/src/utils/sectionNavigation";

export default function StickyHeader() {
  const sale = siteConfig.sale;
  const { scrollY, scrollYProgress } = useScroll();
  
  // Lista de secciones a observar
  const sectionIds: SectionTargetId[] = ["config", "specs", "trust", "faq"];
  // Canonical contract: useActiveSection(sectionIds) (threshold policy lives inside the hook)
  const activeSection = useActiveSection(sectionIds);
  
  // Aparece después de los 100px de scroll
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-20, 0]);

  // Detección de scroll profundo para mostrar CTA (ej: > 15%)
  // En un componente real usaríamos un listener o un hook, 
  // aquí lo simplificamos para que framer maneje la visibilidad
  const showCTA = useTransform(scrollYProgress, [0, 0.15, 0.16], [0, 0, 1]);
  const [isCTAVisible, setIsCTAVisible] = useState(() => showCTA.get() > 0);

  useMotionValueEvent(showCTA, "change", (latest) => {
    setIsCTAVisible(latest > 0);
  });

  const goToSection = (id: SectionTargetId) => {
    navigateToSection(id, { focusTarget: true, smooth: true, updateHash: true });
  };

  const navLinks: Array<{ name: string; id: SectionTargetId }> = [
    { name: "Configuración", id: "config" as const },
    { name: "Ficha Técnica", id: "specs" as const },
    { name: "Confianza", id: "trust" as const },
    { name: "Preguntas", id: "faq" as const },
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
              {sale.productName}
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(link.id);
                    }}
                    className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap relative group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7] ${
                      isActive ? "text-[#A855F7]" : "text-slate-600 hover:text-[#A855F7]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#A855F7] transition-transform origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                  </a>
                );
              })}
            </div>

            {/* CTA Dinámico */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: showCTA, scale: showCTA }}
              tabIndex={isCTAVisible ? 0 : -1}
              aria-hidden={!isCTAVisible}
              className="px-4 py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-purple-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]"
            >
              Contactar
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
