import { useState, useEffect } from 'react';

/**
 * Hook para detectar qué sección está actualmente en el viewport.
 * @param sectionIds Lista de IDs de los elementos a observar.
 * @param threshold Porcentaje de visibilidad para activar la sección (0 a 1).
 * @returns El ID de la sección activa o null.
 */
export default function useActiveSection(sectionIds: string[], threshold = 0.5): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Filtrar solo las que están intersectando y buscar la de mayor ratio
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        const bestEntry = visibleEntries.reduce((prev, current) => 
          (current.intersectionRatio > prev.intersectionRatio) ? current : prev
        );
        setActiveId(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // Múltiples puntos para mayor precisión
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeId;
}
