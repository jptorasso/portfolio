"use client";

import { useRef } from "react";
import styles from "./Tabs.module.css";

/**
 * Pestañas accesibles siguiendo el patrón ARIA "tabs":
 * - Solo la pestaña activa recibe foco con Tab (tabIndex 0); las demás tienen -1.
 * - Las flechas ← → recorren las pestañas; Inicio y Fin van a la primera y la última.
 *
 * Es un componente "controlado": no guarda qué pestaña está activa,
 * la recibe del padre (activeId) y le avisa los cambios (onChange).
 */
export default function Tabs({ tabs, activeId, onChange, panelId, label }) {
  // Array de referencias: una por cada botón, para poder moverles el foco.
  const tabRefs = useRef([]);
  const activeIndex = tabs.findIndex(({ id }) => id === activeId);

  const handleKeyDown = (event, index) => {
    const lastIndex = tabs.length - 1;

    // Objeto de búsqueda: tecla → índice de destino.
    const targetIndexByKey = {
      ArrowRight: index === lastIndex ? 0 : index + 1,
      ArrowLeft: index === 0 ? lastIndex : index - 1,
      Home: 0,
      End: lastIndex,
    };

    const targetIndex = targetIndexByKey[event.key];
    if (targetIndex === undefined) return; // otra tecla: no hacemos nada

    event.preventDefault();
    onChange(tabs[targetIndex].id);
    tabRefs.current[targetIndex]?.focus();
  };

  return (
    // El contenedor externo permite deslizar las pestañas si no entran en pantallas angostas.
    <div className={styles.scroller}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label={label}
        style={{ "--tab-count": tabs.length, "--active-index": activeIndex }}
      >
        <span className={styles.indicator} aria-hidden="true" />
        {tabs.map(({ id, label: tabLabel, count }, index) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              // "Callback ref": React llama a esta función con el elemento del DOM.
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${id}`}
              className={styles.tab}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tabLabel}
              {count !== undefined && <span className={styles.count}>{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
