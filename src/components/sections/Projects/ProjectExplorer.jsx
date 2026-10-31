"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons/Icons";
import Reveal from "@/components/ui/Reveal/Reveal";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectExplorer.module.css";

const ALL = "all";

/**
 * Normaliza un texto para comparar sin importar mayúsculas ni tildes:
 * "Gestión" → "gestion". normalize("NFD") separa cada letra de su tilde
 * y el regex elimina las tildes sueltas.
 */
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

// Texto en el que se busca: título, descripción, categoría y tecnologías.
const getSearchableText = ({ title, tagline, summary, categoryLabel, technologies, libraries }) =>
  normalize([title, tagline, summary, categoryLabel, ...technologies.map(({ name }) => name), ...libraries].join(" "));

export default function ProjectExplorer({ projects, categories }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);
  const searchInputRef = useRef(null);

  // Atajo de teclado: "/" enfoca el buscador (como en GitHub o YouTube).
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (event.key === "/" && !isTyping) {
        event.preventDefault(); // evita que se escriba la barra
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---- Estado derivado ----
  const normalizedQuery = normalize(query.trim());

  // 1) Primero filtramos por texto...
  const searchResults = normalizedQuery
    ? projects.filter((project) => getSearchableText(project).includes(normalizedQuery))
    : projects;

  // 2) ...y después por categoría. Así los contadores de cada categoría
  //    reflejan cuántos resultados de la búsqueda actual hay en ella.
  const visibleProjects =
    activeCategory === ALL
      ? searchResults
      : searchResults.filter(({ category }) => category === activeCategory);

  const countFor = (categoryId) =>
    categoryId === ALL
      ? searchResults.length
      : searchResults.filter(({ category }) => category === categoryId).length;

  const filterOptions = [{ id: ALL, label: "Todos" }, ...categories];
  const hasActiveFilters = query !== "" || activeCategory !== ALL;

  const clearFilters = () => {
    setQuery("");
    setActiveCategory(ALL);
    searchInputRef.current?.focus();
  };

  return (
    <>
      <Reveal className={styles.toolbar}>
        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <label htmlFor="project-search" className="sr-only">
            Buscar proyectos
          </label>
          {/* Input "controlado": su valor siempre viene del estado de React */}
          <input
            ref={searchInputRef}
            id="project-search"
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nombre o tecnología…"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              className={styles.clearButton}
              aria-label="Borrar búsqueda"
              onClick={() => {
                setQuery("");
                searchInputRef.current?.focus();
              }}
            >
              <CloseIcon size={16} />
            </button>
          ) : (
            <kbd className={styles.shortcut} aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        <div className={styles.categories} role="group" aria-label="Filtrar por categoría">
          {filterOptions.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={styles.chip}
              aria-pressed={activeCategory === id}
              onClick={() => setActiveCategory(id)}
            >
              {label}
              <span className={styles.chipCount}>{countFor(id)}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <p className={styles.status} aria-live="polite">
        {`// ${visibleProjects.length} de ${projects.length} proyectos`}
      </p>

      {visibleProjects.length > 0 ? (
        <Reveal as="ul" className={styles.grid} role="list" delay={100}>
          {visibleProjects.map((project, index) => (
            <li key={project.slug} className={styles.item} style={{ "--i": index }}>
              <ProjectCard project={project} />
            </li>
          ))}
        </Reveal>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No encontré proyectos con esos filtros</p>
          <p className={styles.emptyText}>
            Probá con otra palabra, por ejemplo una tecnología como &quot;Blazor&quot; o &quot;SQL&quot;.
          </p>
          {hasActiveFilters && (
            <Button variant="secondary" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          )}
        </div>
      )}
    </>
  );
}
