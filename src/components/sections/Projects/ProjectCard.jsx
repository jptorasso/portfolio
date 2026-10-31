import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons/Icons";
import IllustrativeBadge from "@/components/ui/IllustrativeBadge/IllustrativeBadge";
import { describeImage } from "@/lib/imageNotice";
import styles from "./ProjectCard.module.css";

const MAX_VISIBLE_TECH = 4;

/**
 * Tarjeta de proyecto. Toda la tarjeta es clickeable, pero el único enlace
 * real es el título: un pseudo-elemento (::after) lo estira sobre la tarjeta.
 * Así los lectores de pantalla encuentran un solo enlace con un texto claro.
 */
export default function ProjectCard({ project, priority = false }) {
  const { slug, title, tagline, categoryLabel, accent, summary, technologies, cover, imageNotice } = project;

  const visibleTech = technologies.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = technologies.length - visibleTech.length;

  return (
    <article className={styles.card} style={{ "--accent": accent }}>
      <div className={styles.media}>
        <Image
          src={cover.src}
          alt={describeImage(cover.alt, imageNotice)}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          className={styles.image}
        />
        <IllustrativeBadge notice={imageNotice} />
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{categoryLabel}</p>
        <h3 className={styles.title}>
          {/* prefetch={true}: Next.js precarga la página completa del proyecto
              cuando la tarjeta es visible, así la navegación es instantánea */}
          <Link href={`/proyectos/${slug}`} prefetch={true} className={styles.link}>
            {title}
          </Link>
        </h3>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.summary}>{summary}</p>

        <ul className={styles.stack} role="list" aria-label="Tecnologías">
          {visibleTech.map(({ id, name, color }) => (
            <li key={id} style={{ "--tech-color": color }}>
              {name}
            </li>
          ))}
          {hiddenCount > 0 && <li className={styles.more}>+{hiddenCount}</li>}
        </ul>

        <span className={styles.cta} aria-hidden="true">
          Ver proyecto
          <ArrowRightIcon size={16} />
        </span>
      </div>
    </article>
  );
}
