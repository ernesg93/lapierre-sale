"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/src/config/site";

export default function StickyHeader() {
  const { scrollY } = useScroll();
  
  // Aparece después de los 100px de scroll (aprox 10vh)
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-20, 0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: "Ficha Técnica", id: "specs" },
    { name: "Confianza", id: "trust" },
    { name: "Preguntas", id: "faq" },
  ];

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg"
    >
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-full px-6 py-3 flex items-center justify-between gap-4">
        <span className="text-slate-900 font-bold tracking-tight text-sm sm:text-base whitespace-nowrap">
          {siteConfig.name}
        </span>
        
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-[#A855F7] transition-colors whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
