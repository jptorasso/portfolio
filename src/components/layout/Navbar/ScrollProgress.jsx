import { useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

/**
 * Barra fina que muestra cuánto se recorrió de la página.
 * Se actualiza en cada scroll, así que en lugar de usar estado (que
 * re-renderizaría el componente decenas de veces por segundo) escribimos
 * el estilo directamente sobre el elemento a través de una ref.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    // requestAnimationFrame agrupa las actualizaciones con el refresco de pantalla.
    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return <div ref={barRef} className={styles.progress} aria-hidden="true" />;
}
