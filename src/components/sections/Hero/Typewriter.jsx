"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTypewriter } from "@/hooks/useTypewriter";
import styles from "./Typewriter.module.css";

export default function Typewriter({ words }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const typedText = useTypewriter(words, { enabled: !prefersReducedMotion });

  // Con movimiento reducido mostramos la primera frase completa, sin animar.
  const text = prefersReducedMotion ? words[0] : typedText;

  return (
    <span className={styles.typewriter}>
      <span className={styles.text}>{text}</span>
      <span className={styles.cursor} />
    </span>
  );
}
