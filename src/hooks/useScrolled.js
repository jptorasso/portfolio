import { useEffect, useState } from "react";

/**
 * Devuelve true cuando la página se desplazó más de `threshold` píxeles.
 * Se usa para cambiar el estilo del navbar al hacer scroll.
 */
export function useScrolled(threshold = 0) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);

    // `passive: true` le avisa al navegador que no vamos a cancelar el scroll,
    // así puede desplazar la página sin esperar a nuestro código.
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpieza: se ejecuta cuando el componente se desmonta.
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
