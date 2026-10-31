"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { cx } from "@/lib/cx";
import styles from "./Reveal.module.css";

/**
 * Hace aparecer su contenido con una animación cuando entra en pantalla.
 *
 * Es un Client Component, pero su `children` puede venir de un Server Component:
 * el contenido se renderiza en el servidor y Reveal solo agrega el comportamiento.
 *
 * Props:
 * - as: etiqueta HTML a renderizar ("div", "p", "li", "section"...)
 * - delay: retraso en milisegundos (útil para escalonar elementos)
 */
export default function Reveal({ as: Tag = "div", delay = 0, className, children, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, isInView && styles.visible, className)}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
