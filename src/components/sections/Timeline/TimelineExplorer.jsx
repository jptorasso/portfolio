"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal/Reveal";
import Tabs from "@/components/ui/Tabs/Tabs";
import TimelineItem from "./TimelineItem";
import styles from "./Timeline.module.css";

const ALL = "all";
const PANEL_ID = "timeline-panel";

// Limita un número a un rango: clamp(1.4, 0, 1) → 1
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function TimelineExplorer({ entries, types }) {
  const [activeTab, setActiveTab] = useState(ALL);
  const panelRef = useRef(null);
  const progressRef = useRef(null);

  // ---- Estado derivado ----

  // reduce para armar un objeto de conteo: { experience: 2, education: 2, ... }
  // [type] entre corchetes es una "propiedad computada": usa el valor de la variable como clave.
  const countsByType = entries.reduce(
    (counts, { type }) => ({ ...counts, [type]: (counts[type] ?? 0) + 1 }),
    {},
  );

  // Solo mostramos pestañas para los tipos que tienen al menos una entrada.
  const tabs = [
    { id: ALL, label: "Todo", count: entries.length },
    ...types
      .filter(({ id }) => countsByType[id] > 0)
      .map(({ id, label }) => ({ id, label, count: countsByType[id] })),
  ];

  // Object.fromEntries convierte [["experience", {...}], ...] en { experience: {...}, ... }
  const typeById = Object.fromEntries(types.map((type) => [type.id, type]));

  const visibleEntries = activeTab === ALL ? entries : entries.filter(({ type }) => type === activeTab);

  // La línea de progreso se llena a medida que la línea de tiempo cruza la pantalla.
  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const { top, height } = panelRef.current.getBoundingClientRect();
      // Punto de referencia: un poco más abajo de la mitad de la pantalla.
      const referenceLine = window.innerHeight * 0.6;
      const progress = clamp((referenceLine - top) / height, 0, 1);
      progressRef.current.style.transform = `scaleY(${progress})`;
    };

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
  }, [activeTab]); // al cambiar de pestaña cambia el alto: recalculamos

  return (
    <>
      <Reveal className={styles.tabsWrapper}>
        <Tabs
          tabs={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
          panelId={PANEL_ID}
          label="Filtrar trayectoria por tipo"
        />
      </Reveal>

      <div
        ref={panelRef}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className={styles.panel}
      >
        <div className={styles.track} aria-hidden="true">
          <div ref={progressRef} className={styles.progress} />
        </div>

        <ol className={styles.list} role="list">
          {visibleEntries.map((entry, index) => (
            <TimelineItem
              // Con la pestaña en la key, cada cambio vuelve a montar los hitos y se repite la animación.
              key={`${activeTab}-${entry.id}`}
              entry={entry}
              typeInfo={typeById[entry.type]}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
