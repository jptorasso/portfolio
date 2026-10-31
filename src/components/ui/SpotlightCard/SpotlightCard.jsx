"use client";

import { cx } from "@/lib/cx";
import styles from "./SpotlightCard.module.css";

/**
 * Tarjeta con un brillo que sigue al mouse por dentro y sobre el borde.
 *
 * A diferencia del Hero (que escucha en `window`), acá usamos el evento de
 * React `onPointerMove` directamente sobre la tarjeta: solo se dispara
 * cuando el mouse está encima de ella.
 */
export default function SpotlightCard({ as: Tag = "div", className, children }) {
  const handlePointerMove = (event) => {
    const card = event.currentTarget; // el elemento que tiene el listener
    const { left, top } = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - left}px`);
    card.style.setProperty("--my", `${event.clientY - top}px`);
  };

  return (
    <Tag className={cx(styles.card, className)} onPointerMove={handlePointerMove}>
      {children}
    </Tag>
  );
}
