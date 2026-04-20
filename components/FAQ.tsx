"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "¿Ha tenido caídas o reparaciones estructurales?",
    answer: "No, el cuadro jamás tocó el asfalto. La pintura original (sellada de fábrica) no interviene raspones y está a prueba de cualquier revisión. Las típicas marcas que pueda tener son exclusivamente de apoyarla o el sistema de candado."
  },
  {
    question: "¿Por qué la vendes con menos de 1 año?",
    answer: "Principalmente por cambio de disciplina. Me pasé full a ruta y la bici está juntando polvo en la pieza, algo que es un pecado para este modelo. Quiero que alguien que le vaya a sacar el jugo urbano o en senderos la aproveche."
  },
  {
    question: "¿Qué incluye exactamente el pack de accesorios?",
    answer: "Si optas por el pack te llevas: Pedales automáticos Shimano (valorados en ~50€), 2 portabidones Élite ligeros, un bolso de sillín de herramientas basico y las luces recargables delantera y trasera. Un 'ready-to-ride' literal."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#F8FAFC] border-t border-slate-200 w-full">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-lg text-slate-600">
            Sin respuestas de manual. La verdad por delante.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white border transition-colors rounded-2xl overflow-hidden ${isOpen ? 'border-[#A855F7] shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#A855F7]' : ''}`} />
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4 px-6 pb-5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
