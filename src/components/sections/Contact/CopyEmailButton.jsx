"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/Icons/Icons";
import styles from "./Contact.module.css";

const FEEDBACK_DURATION = 2000;

/** Copia el email al portapapeles con la Clipboard API del navegador. */
export default function CopyEmailButton({ email }) {
  const [copyState, setCopyState] = useState("idle"); // "idle" | "copied" | "error"

  // Después de 2 segundos, el botón vuelve a su estado normal.
  useEffect(() => {
    if (copyState === "idle") return;
    const timeoutId = setTimeout(() => setCopyState("idle"), FEEDBACK_DURATION);
    return () => clearTimeout(timeoutId);
  }, [copyState]);

  const handleCopy = async () => {
    try {
      // writeText devuelve una Promise: puede fallar si el navegador no da permiso.
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  const labels = {
    idle: "Copiar",
    copied: "¡Copiado!",
    error: "No se pudo copiar",
  };

  return (
    <button
      type="button"
      className={styles.copyButton}
      data-state={copyState}
      onClick={handleCopy}
      aria-label={copyState === "idle" ? `Copiar ${email}` : labels[copyState]}
    >
      {copyState === "copied" ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      <span aria-hidden="true">{labels[copyState]}</span>
    </button>
  );
}
