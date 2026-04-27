import React from 'react';
import { buildPurchaseWhatsAppUrl, siteConfig } from '@/src/config/site';

export default function PurchaseConfig() {
  const configOptions = siteConfig.sale.purchaseOptions;

  return (
    <section id="config" className="py-24 bg-white w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Opciones de Entrega</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Llevatela pelada o armate un pack con los accesorios que ya están probados en este cuadro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {configOptions.map((opt) => (
            <div 
              key={opt.id} 
              className={`relative flex flex-col p-8 rounded-3xl transition-transform hover:-translate-y-1 ${
                opt.highlight 
                  ? 'bg-slate-50 border-2 border-[#A855F7] shadow-xl shadow-purple-500/10' 
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {opt.highlight && (
                <div className="absolute -top-4 inset-x-0 mx-auto w-fit">
                  <span className="bg-[#A855F7] text-white text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    {opt.badge}
                  </span>
                </div>
              )}
              
              <div className="mb-8 flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{opt.title}</h3>
                <div className="text-3xl font-light text-slate-800 mb-4">{opt.price}</div>
                <p className="text-slate-600 leading-relaxed">{opt.description}</p>
              </div>
              
              <a 
                href={buildPurchaseWhatsAppUrl(opt.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-center rounded-xl font-semibold transition-colors focus:ring-4 focus:outline-none ${
                   opt.highlight 
                    ? 'bg-[#A855F7] text-white hover:bg-[#9333EA] focus:ring-[#A855F7]/30'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-200'
                }`}
              >
                Me interesa esta opción
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-slate-600 font-medium flex items-center justify-center gap-2">
            <span className="text-xl">🤝</span> Prueba en persona coordinada | Pago seguro en entrega
          </p>
        </div>
      </div>
    </section>
  );
}
