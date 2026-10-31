import AnimatedCounter from "@/components/ui/AnimatedCounter/AnimatedCounter";
import { BriefcaseIcon, CodeIcon, DatabaseIcon, ZapIcon } from "@/components/ui/Icons/Icons";
import Reveal from "@/components/ui/Reveal/Reveal";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";
import { about } from "@/data/about";
import { renderHighlights } from "@/lib/renderHighlights";
import styles from "./About.module.css";

const focusIcons = {
  briefcase: BriefcaseIcon,
  database: DatabaseIcon,
  zap: ZapIcon,
  code: CodeIcon,
};

// Milisegundos entre la aparición de un elemento y el siguiente.
const STAGGER = 100;

/** Sección "Sobre mí": Server Component que combina piezas interactivas. */
export default function About() {
  const { title, paragraphs, stats, focusAreas } = about;

  return (
    <section id="sobre-mi" className={styles.about} aria-labelledby="sobre-mi-title">
      <div className="container">
        <SectionHeader titleId="sobre-mi-title" number="01" eyebrow="Sobre mí" title={title} />

        <div className={styles.grid}>
          <div className={styles.text}>
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={index * STAGGER}>
                {renderHighlights(paragraph)}
              </Reveal>
            ))}

            <Reveal as="dl" className={styles.stats} delay={paragraphs.length * STAGGER}>
              {stats.map(({ id, value, prefix, suffix, label }) => (
                <div key={id} className={styles.stat}>
                  <dt>{label}</dt>
                  <dd>
                    <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>

          <ul className={styles.cards} role="list" aria-label="Qué aporto">
            {focusAreas.map(({ id, icon, title: areaTitle, description }, index) => {
              const Icon = focusIcons[icon];
              return (
                <Reveal key={id} as="li" delay={index * STAGGER}>
                  <SpotlightCard as="article" className={styles.card}>
                    <span className={styles.cardIcon}>
                      <Icon />
                    </span>
                    <h3>{areaTitle}</h3>
                    <p>{description}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
