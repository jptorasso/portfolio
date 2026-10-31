"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroBackground.module.css";

const EASING = 0.12; // qué tan rápido la luz alcanza al cursor (0 a 1)

/**
 * Fondo del Hero: grilla, luces difusas y un foco de luz que sigue al mouse.
 *
 * La posición del mouse cambia decenas de veces por segundo. Si la guardáramos
 * en el estado, React re-renderizaría todo ese tiempo. En cambio, actualizamos
 * dos variables CSS (--x y --y) a través de una ref y el CSS hace el resto.
 */
export default function HeroBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // En pantallas táctiles o con movimiento reducido no seguimos el cursor.
    if (!container || !hasFinePointer || prefersReducedMotion) return;

    const { width, height } = container.getBoundingClientRect();
    const target = { x: width / 2, y: height * 0.35 };
    const current = { ...target };
    let frameId = null;

    // Interpolación lineal: en cada cuadro avanzamos un porcentaje de la
    // distancia que falta. Eso produce un movimiento suave, con "inercia".
    const animate = () => {
      current.x += (target.x - current.x) * EASING;
      current.y += (target.y - current.y) * EASING;

      container.style.setProperty("--x", `${current.x}px`);
      container.style.setProperty("--y", `${current.y}px`);

      const isSettled =
        Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
      frameId = isSettled ? null : requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      if (frameId === null) frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.background} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbViolet}`} />
      <div className={`${styles.orb} ${styles.orbBlue}`} />
      <div className={styles.grid} />
      <div className={styles.gridHighlight} />
      <div className={styles.spotlight} />
      <div className={styles.fade} />
    </div>
  );
}
