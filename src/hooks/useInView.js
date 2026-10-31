import { useEffect, useState } from "react";

/**
 * Devuelve true cuando el elemento de `ref` entra en la pantalla.
 * Con `once: true` (por defecto) deja de observar después de la primera vez,
 * así la animación no se repite cada vez que el usuario sube y baja.
 */
export function useInView(
  ref,
  { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = {},
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // El callback recibe un array de entradas; como observamos un solo
    // elemento, lo desestructuramos directamente: [entry].
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return isInView;
}
