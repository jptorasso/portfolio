import { useEffect, useState } from "react";

/**
 * Observa las secciones indicadas y devuelve el id de la que está
 * en el centro de la pantalla. Usa IntersectionObserver, una API del
 * navegador mucho más eficiente que calcular posiciones en cada scroll.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean); // descarta los ids que no existen en la página

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Achicamos el área observada a una franja en el medio de la pantalla:
      // una sección se considera "activa" cuando cruza esa franja.
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
