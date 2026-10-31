import { useRef } from "react";
import { AwardIcon, BriefcaseIcon, ExternalLinkIcon, GraduationCapIcon } from "@/components/ui/Icons/Icons";
import { useInView } from "@/hooks/useInView";
import styles from "./Timeline.module.css";

const typeIcons = {
  briefcase: BriefcaseIcon,
  graduation: GraduationCapIcon,
  award: AwardIcon,
};

/**
 * Un hito de la línea de tiempo. Usa su propio useInView para saber cuándo
 * entra en pantalla: en ese momento aparece la tarjeta y se "enciende" su nodo.
 */
export default function TimelineItem({ entry, typeInfo, side }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.25 });

  // Valores por defecto en la desestructuración: si una entrada no tiene logros o etiquetas, usamos [].
  const { title, organization, period, current, description, highlights = [], tags = [], credentialUrl, draft } = entry;
  const Icon = typeIcons[typeInfo.icon];

  return (
    <li ref={ref} className={styles.item} data-side={side} data-visible={isInView} data-draft={draft}>
      <span className={styles.node} aria-hidden="true">
        <Icon size={14} />
      </span>

      <article className={styles.card}>
        <header className={styles.cardHeader}>
          <span className={styles.type}>{typeInfo.badge}</span>
          <span className={styles.period}>
            {current && <span className={styles.currentDot} aria-hidden="true" />}
            {period}
          </span>
        </header>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.organization}>{organization}</p>
        {description && <p className={styles.description}>{description}</p>}

        {highlights.length > 0 && (
          <ul className={styles.highlights} role="list">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <ul className={styles.tags} role="list" aria-label="Tecnologías">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {credentialUrl && (
          <a href={credentialUrl} className={styles.credential} target="_blank" rel="noopener noreferrer">
            Ver credencial
            <ExternalLinkIcon size={14} />
          </a>
        )}

        {draft && <p className={styles.draftNote}>Borrador · completalo en src/data/timeline.js (no se publica)</p>}
      </article>
    </li>
  );
}
