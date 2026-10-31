import Reveal from "@/components/ui/Reveal/Reveal";
import { renderHighlights } from "@/lib/renderHighlights";
import styles from "./SectionHeader.module.css";

/**
 * Encabezado común a todas las secciones: número, etiqueta, título y descripción.
 * El título acepta **resaltados** con la misma sintaxis que los datos.
 */
export default function SectionHeader({ titleId, number, eyebrow, title, description }) {
  return (
    <Reveal className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.number}>{number}</span>
        {eyebrow}
      </p>
      <h2 id={titleId} className={styles.title}>
        {renderHighlights(title)}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </Reveal>
  );
}
