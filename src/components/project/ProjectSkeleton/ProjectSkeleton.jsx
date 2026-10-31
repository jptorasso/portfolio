import styles from "./ProjectSkeleton.module.css";

/**
 * "Esqueleto" que se ve por un instante mientras se resuelve el proyecto.
 * Imita la forma de la página real para que no haya saltos al cargar.
 */
export default function ProjectSkeleton() {
  return (
    <div className={`container ${styles.skeleton}`} aria-busy="true" aria-label="Cargando proyecto">
      <span className={`${styles.block} ${styles.back}`} />
      <span className={`${styles.block} ${styles.eyebrow}`} />
      <span className={`${styles.block} ${styles.title}`} />
      <span className={`${styles.block} ${styles.tagline}`} />
      <span className={`${styles.block} ${styles.cover}`} />
    </div>
  );
}
