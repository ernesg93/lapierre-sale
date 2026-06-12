"use client";

import React from 'react';
import { siteConfig, whatsappUrl } from '@/src/config/site';

export default function Footer() {
  const sale = siteConfig.sale;

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{sale.productName}</h2>
            <p className="text-slate-400 max-w-sm">{sale.footer.blurb}</p>
          </div>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-full font-semibold transition-transform hover:scale-105 shadow-lg shadow-purple-500/20"
          >
            {sale.footer.primaryCtaLabel}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-12">
          
          {/* Navegación rápida */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Navegación</h3>
            <ul className="space-y-3">
              <li><a href="#config" className="hover:text-white transition-colors">Configuración</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Ficha Técnica</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors">Confianza</a></li>
            </ul>
          </div>

          {/* Contacto Directo */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contacto Directo</h3>
            <p className="mb-2">¿Querés hablar por esta Lapierre Pro Race?</p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A855F7] hover:text-[#D8B4FE] font-medium transition-colors"
            >
              WhatsApp {siteConfig.whatsappNumber} →
            </a>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Aviso Legal</h3>
            <p className="text-sm text-slate-500 leading-relaxed text-balance">
              Venta entre particulares de una sola Lapierre Pro Race. La bici se ofrece con descripción veraz, fotos reales y coordinación directa antes de avanzar. No se ofrece garantía comercial ni devoluciones después de concretada la venta.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
