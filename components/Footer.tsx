"use client";

import React from 'react';

// Formato internacional sin '+' (Ej: código de país + número)
const WHATSAPP_NUMBER = "5356793586";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Lapierre Híbrida Carbono</h2>
            <p className="text-slate-400 max-w-sm">Una bici espectacular esperando salir a rodar. Lista para entregar.</p>
          </div>
          
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20la%20Lapierre.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-full font-semibold transition-transform hover:scale-105 shadow-lg shadow-purple-500/20"
          >
            Darle un nuevo hogar a esta Lapierre
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-12">
          
          {/* Navegación rápida */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Navegación</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollTo('config')} className="hover:text-white transition-colors">Configuración</button></li>
              <li><button onClick={() => scrollTo('specs')} className="hover:text-white transition-colors">Ficha Técnica</button></li>
              <li><button onClick={() => scrollTo('trust')} className="hover:text-white transition-colors">Confianza</button></li>
            </ul>
          </div>

          {/* Contacto Directo */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contacto Directo</h3>
            <p className="mb-2">¿Consultas sin compromiso?</p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A855F7] hover:text-[#D8B4FE] font-medium transition-colors"
            >
              wa.me/{WHATSAPP_NUMBER} →
            </a>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Aviso Legal</h3>
            <p className="text-sm text-slate-500 leading-relaxed text-balance">
              Venta entre particulares. Se entrega tal cual, con descripción veraz y fotos reales. Se recomienda revisión post-compra para total garantía del comprador. Una vez finalizada la venta, no se aceptan devoluciones.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
