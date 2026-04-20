import React from 'react';

const specs = [
  { label: "Cuadro", value: "Carbono Lapierre Advanced Composite" },
  { label: "Grupo", value: "Shimano GRX 1x11 (Híbrido configurado)" },
  { label: "Ruedas", value: "DT Swiss G1800 Spline" },
  { label: "Frenos", value: "Shimano Hidráulicos MT200" },
  { label: "Talla", value: "M (Ideal para 1.70m - 1.82m)" },
  { label: "Peso aprox.", value: "9.8 kg" },
  { label: "Año de compra", value: "2025" },
  { label: "Uso principal", value: "Urbano y senderos ligeros" },
  { label: "Kilometraje est.", value: "< 500 km" },
  { 
    label: "Estado 8/10", 
    value: "Mecánica 10/10. Detalles cosméticos menores en la pintura por candado U-Lock y uso diario." 
  },
];

export default function TechSpecs() {
  return (
    <section id="specs" className="py-24 bg-[#F8FAFC] border-t border-slate-200 w-full">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Ficha Técnica</h2>
          <p className="text-lg text-slate-600">
            Valores reales verificados. Fotos sin filtros. Cuadro de carbono Lapierre original.
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <ul className="divide-y divide-slate-100">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row py-4 px-6 hover:bg-slate-50 transition-colors">
                <div className="sm:w-1/3 text-sm font-medium text-slate-500 uppercase tracking-wider pt-1 mb-1 sm:mb-0">
                  {spec.label}
                </div>
                <div className="sm:w-2/3 text-lg text-slate-900 font-medium">
                  {spec.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
