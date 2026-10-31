import { projectCategories, projects } from "@/data/projects";
import { techCategories } from "@/data/technologies";

// Todas las tecnologías en un solo array, para poder buscarlas por id.
const allTechnologies = techCategories.flatMap(({ technologies }) => technologies);

/** Devuelve la tecnología con ese id, o undefined si no existe. */
export const findTechnology = (id) => allTechnologies.find((tech) => tech.id === id);

/** Devuelve el nombre legible de una categoría de proyecto. */
export const getCategoryLabel = (categoryId) =>
  projectCategories.find(({ id }) => id === categoryId)?.label ?? categoryId;

/** Busca un proyecto por su slug (la parte final de la URL). */
export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);

/**
 * Proyecto anterior y siguiente, para navegar entre páginas de detalle.
 * El operador % hace que la lista sea circular: después del último viene el primero.
 */
export function getAdjacentProjects(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  const total = projects.length;
  return {
    previous: projects[(index - 1 + total) % total],
    next: projects[(index + 1) % total],
  };
}

/**
 * Prepara un proyecto para mostrarlo en una tarjeta: reemplaza los ids del stack
 * por los datos completos de cada tecnología y agrega el nombre de la categoría.
 * El resultado es un objeto simple que se puede pasar a un Client Component.
 */
export const toProjectCard = ({
  slug,
  title,
  tagline,
  category,
  accent,
  summary,
  stack,
  libraries,
  images,
  imageNotice = null,
}) => ({
  slug,
  title,
  tagline,
  category,
  categoryLabel: getCategoryLabel(category),
  accent,
  summary,
  technologies: stack.map(findTechnology).filter(Boolean),
  libraries,
  cover: images[0],
  imageNotice,
});
