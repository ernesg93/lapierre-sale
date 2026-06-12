import React from 'react';
import { ShieldCheck, Search, Handshake, CreditCard, type LucideIcon } from 'lucide-react';

interface Badge {
  Icon: LucideIcon;
  title: string;
}

const badges: Badge[] = [
  { Icon: ShieldCheck, title: 'Una sola bici real, sin packs ni variantes' },
  { Icon: Search, title: 'Poco uso y estado como nueva' },
  { Icon: Handshake, title: 'La ves en persona y preguntás todo' },
  { Icon: CreditCard, title: 'Coordinación directa por WhatsApp' },
];

export default function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-24 md:py-32 bg-white w-full border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Compra con <span className="text-[#A855F7]">Confianza</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Esta venta es simple: una Lapierre Pro Race real, poco uso, como nueva y sin adornos. Si necesitás confirmar algo, lo hablamos directo antes de avanzar.
            </p>
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700">Venta directa y transparente</span>
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
