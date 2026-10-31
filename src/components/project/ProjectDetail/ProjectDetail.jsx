import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/project/ProjectGallery/ProjectGallery";
import Button from "@/components/ui/Button/Button";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LockIcon,
} from "@/components/ui/Icons/Icons";
import IllustrativeBadge from "@/components/ui/IllustrativeBadge/IllustrativeBadge";
import Reveal from "@/components/ui/Reveal/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";
import { describeImage, imageNoticeShortTexts, imageNoticeTexts } from "@/lib/imageNotice";
import { findTechnology, getAdjacentProjects, getCategoryLabel, getProjectBySlug } from "@/lib/projects";
import styles from "./ProjectDetail.module.css";

/**
 * Contenido de la página de un proyecto. Es un Server Component asíncrono:
 * espera a que `params` (una Promise) se resuelva para saber qué proyecto mostrar.
 */
export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Si el slug no existe, Next.js muestra la página 404 (app/not-found.js).
  if (!project) notFound();

  const {
    title,
    tagline,
    category,
    accent,
    description,
    stack,
    libraries,
    features,
    technicalDetails,
    images,
    links,
    imageNotice = null,
  } = project;
  const technologies = stack.map(findTechnology).filter(Boolean);
  const { previous, next } = getAdjacentProjects(slug);
  const [cover] = images; // desestructuración: la primera imagen es la portada

  return (
    <article className={styles.page} style={{ "--accent": accent }}>
      <div className="container">
        <Link href="/#proyectos" className={styles.back}>
          <ArrowLeftIcon size={16} />
          Volver a proyectos
        </Link>

        <header className={styles.header}>
          <p className={styles.category}>{getCategoryLabel(category)}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.tagline}>{tagline}</p>

          <ul className={styles.techList} role="list" aria-label="Tecnologías principales">
            {technologies.map(({ id, name, short, color }) => (
              <li key={id} style={{ "--tech-color": color }}>
                <span className={styles.techLogo} aria-hidden="true">
                  {short}
                </span>
                {name}
              </li>
            ))}
          </ul>

          {(links.repo || links.demo) && (
            <div className={styles.links}>
              {links.demo && (
                <Button href={links.demo} target="_blank" rel="noopener noreferrer">
                  Ver demo
                  <ExternalLinkIcon size={16} />
                </Button>
              )}
              {links.repo && (
                <Button href={links.repo} variant="secondary" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon size={16} />
                  Código fuente
                </Button>
              )}
            </div>
          )}
        </header>

        <div className={styles.cover}>
          <Image
            src={cover.src}
            alt={describeImage(cover.alt, imageNotice)}
            fill
            priority
            sizes="(min-width: 1264px) 1200px, 100vw"
          />
          <IllustrativeBadge notice={imageNotice} />
        </div>

        {imageNotice && (
          <p className={styles.notice}>
            {imageNotice === "confidential" ? <LockIcon size={16} /> : <AlertCircleIcon size={16} />}
            <span>
              {imageNoticeTexts[imageNotice]}
              {imageNotice === "confidential" && (
                <>
                  {" "}
                  <Link href="/#contacto">Coordinemos una demo</Link>.
                </>
              )}
            </span>
          </p>
        )}

        <div className={styles.content}>
          <div className={styles.main}>
            <Reveal as="section" aria-labelledby="descripcion">
              <h2 id="descripcion" className={styles.heading}>
                Descripción
              </h2>
              {description.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal as="section" aria-labelledby="funcionalidades">
              <h2 id="funcionalidades" className={styles.heading}>
                Funcionalidades
              </h2>
              <ul className={styles.features} role="list">
                {features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon size={16} className={styles.check} />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" aria-labelledby="detalle-tecnico">
              <h2 id="detalle-tecnico" className={styles.heading}>
                Detalle técnico
              </h2>
              <ul className={styles.details} role="list">
                {technicalDetails.map(({ title: detailTitle, description: detailText }, index) => (
                  <li key={detailTitle}>
                    <SpotlightCard as="article">
                      {/* padStart completa con ceros: 1 → "01" */}
                      <span className={styles.detailNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <h3 className={styles.detailTitle}>{detailTitle}</h3>
                      <p className={styles.detailText}>{detailText}</p>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className={styles.sidebar} aria-label="Ficha técnica">
            <div className={styles.factSheet}>
              <h2 className={styles.factTitle}>Ficha técnica</h2>
              <dl className={styles.facts}>
                <div>
                  <dt>Categoría</dt>
                  <dd>{getCategoryLabel(category)}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{technologies.map(({ name }) => name).join(" · ")}</dd>
                </div>
                {libraries.length > 0 && (
                  <div>
                    <dt>Librerías y herramientas</dt>
                    <dd>{libraries.join(" · ")}</dd>
                  </div>
                )}
                <div>
                  <dt>Funcionalidades</dt>
                  <dd>{features.length} principales</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <Reveal as="section" className={styles.gallery} aria-labelledby="galeria">
          <h2 id="galeria" className={styles.heading}>
            Galería
          </h2>
          {imageNotice && <p className={styles.galleryNote}>{imageNoticeShortTexts[imageNotice]}</p>}
          <ProjectGallery images={images} title={title} imageNotice={imageNotice} />
        </Reveal>

        <nav className={styles.pager} aria-label="Otros proyectos">
          <Link href={`/proyectos/${previous.slug}`} prefetch={true} className={styles.pagerLink}>
            <span className={styles.pagerLabel}>
              <ArrowLeftIcon size={14} /> Anterior
            </span>
            <span className={styles.pagerTitle}>{previous.title}</span>
          </Link>
          <Link href={`/proyectos/${next.slug}`} prefetch={true} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerLabel}>
              Siguiente <ArrowRightIcon size={14} />
            </span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
