"use client";

import { useState } from "react";
import { DatabaseIcon, LayoutIcon, ServerIcon, WrenchIcon } from "@/components/ui/Icons/Icons";
import Reveal from "@/components/ui/Reveal/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";
import styles from "./TechExplorer.module.css";

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "mastered", label: "Domino" },
  { id: "learning", label: "Aprendiendo" },
];

const LEVEL_LABELS = {
  mastered: "Domino",
  learning: "Aprendiendo",
};

const categoryIcons = {
  server: ServerIcon,
  layout: LayoutIcon,
  database: DatabaseIcon,
  wrench: WrenchIcon,
};

const matchesFilter = (tech, filterId) => filterId === "all" || tech.level === filterId;

/**
 * Tarjetas de tecnologías con filtro por nivel.
 * Recibe las categorías como props desde un Server Component: por eso
 * los datos tienen que ser "serializables" (texto, números, arrays, objetos).
 */
export default function TechExplorer({ categories }) {
  // El ÚNICO estado es el filtro elegido. Todo lo demás se calcula a partir de él.
  const [activeFilter, setActiveFilter] = useState("all");

  // ---- Estado derivado: se recalcula en cada render, nunca se guarda en useState ----

  // flatMap: junta las tecnologías de todas las categorías en un solo array.
  const allTechnologies = categories.flatMap(({ technologies }) => technologies);

  const countFor = (filterId) =>
    allTechnologies.filter((tech) => matchesFilter(tech, filterId)).length;

  // Para cada categoría nos quedamos con sus tecnologías visibles (spread para no
  // modificar el objeto original) y descartamos las categorías que quedan vacías.
  const visibleCategories = categories
    .map((category) => ({
      ...category,
      technologies: category.technologies.filter((tech) => matchesFilter(tech, activeFilter)),
    }))
    .filter(({ technologies }) => technologies.length > 0);

  // reduce: acumula un total recorriendo el array.
  const visibleCount = visibleCategories.reduce(
    (total, { technologies }) => total + technologies.length,
    0,
  );

  const activeIndex = FILTERS.findIndex(({ id }) => id === activeFilter);

  return (
    <>
      <Reveal className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filtrar tecnologías por nivel"
          style={{ "--active-index": activeIndex }}
        >
          <span className={styles.indicator} aria-hidden="true" />
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={styles.filterButton}
              aria-pressed={activeFilter === id}
              onClick={() => setActiveFilter(id)}
            >
              {id !== "all" && <span className={styles.levelDot} data-level={id} aria-hidden="true" />}
              {label}
              <span className={styles.filterCount}>{countFor(id)}</span>
            </button>
          ))}
        </div>

        {/* aria-live: los lectores de pantalla anuncian el cambio al filtrar */}
        <p className={styles.status} aria-live="polite">
          {`// mostrando ${visibleCount} de ${allTechnologies.length} tecnologías`}
        </p>
      </Reveal>

      <Reveal as="ul" className={styles.grid} role="list" delay={100}>
        {visibleCategories.map(({ id, title, icon, description, technologies }) => {
          const Icon = categoryIcons[icon];
          const countLabel = technologies.length === 1 ? "tecnología" : "tecnologías";

          return (
            <li key={id}>
              <SpotlightCard as="article" className={styles.card}>
                <header className={styles.cardHeader}>
                  <span className={styles.cardIcon}>
                    <Icon />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p className={styles.cardMeta}>{`${technologies.length} ${countLabel}`}</p>
                  </div>
                </header>

                <p className={styles.cardDescription}>{description}</p>

                <ul className={styles.techList} role="list">
                  {technologies.map(({ id: techId, name, short, color, level }, index) => (
                    // La key incluye el filtro: al cambiarlo, React vuelve a montar
                    // el elemento y su animación de entrada se repite.
                    <li
                      key={`${activeFilter}-${techId}`}
                      className={styles.tech}
                      data-level={level}
                      style={{ "--tech-color": color, "--i": index }}
                    >
                      <span className={styles.logo} aria-hidden="true">
                        {short}
                      </span>
                      <span className={styles.techInfo}>
                        <span className={styles.techName}>{name}</span>
                        <span className={styles.techLevel}>
                          <span className={styles.levelDot} data-level={level} aria-hidden="true" />
                          {LEVEL_LABELS[level]}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </li>
          );
        })}
      </Reveal>
    </>
  );
}
