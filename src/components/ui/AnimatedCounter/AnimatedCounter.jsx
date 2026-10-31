"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DURATION = 1600; // milisegundos

// Función de "easing": arranca rápido y frena al final. Recibe y devuelve un valor entre 0 y 1.
const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

// API del navegador para formatear números según el idioma (1500 → "1.500").
const numberFormatter = new Intl.NumberFormat("es-AR");

/** Número que cuenta desde 0 hasta `value` cuando aparece en pantalla. */
export default function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let frameId = 0;
    let startTime = null;

    // requestAnimationFrame le pasa a `step` el momento actual en milisegundos.
    const step = (timestamp) => {
      startTime ??= timestamp; // solo se asigna en el primer cuadro
      const progress = Math.min((timestamp - startTime) / DURATION, 1);
      setCount(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReducedMotion, value]);

  const displayedValue = prefersReducedMotion ? value : count;

  return (
    <span ref={ref}>
      {/* Los lectores de pantalla leen el valor final, no cada número intermedio */}
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {numberFormatter.format(displayedValue)}
        {suffix}
      </span>
    </span>
  );
}
