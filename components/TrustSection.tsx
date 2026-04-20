import React from 'react';
import { ShieldCheck, Search, Handshake, CreditCard, type LucideIcon } from 'lucide-react';

interface Badge {
  Icon: LucideIcon;
  title: string;
}

const badges: Badge[] = [
  { Icon: ShieldCheck, title: "Factura original disponible" },
  { Icon: Search,      title: "Nº de serie verificable" },
  { Icon: Handshake,   title: "Prueba en zona pública" },
  { Icon: CreditCard,  title: "Pago en efectivo o transferencia segura" },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-24 bg-white w-full border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Compra con <span className="text-[#A855F7]">Confianza</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Proceso 100% transparente. Entrego documentación original, factura con mis datos personales (comprobables) y permito cualquier revisión mecánica en taller de confianza antes de la entrega. Sin vueltas.
            </p>
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700">Verificado para venta local</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {badges.map((badge, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm w-fit">
                  <badge.Icon className="w-8 h-8 text-[#A855F7]" />
                </div>
                <h3 className="text-slate-900 font-semibold">{badge.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
