import Button from "@/components/ui/Button/Button";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons/Icons";
import { profile } from "@/data/profile";
import CodeWindow from "./CodeWindow";
import HeroBackground from "./HeroBackground";
import Typewriter from "./Typewriter";
import styles from "./Hero.module.css";

// Relaciona el id de cada red social con su ícono (evita un if/switch).
const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

// Retraso de la animación de entrada de cada bloque, en milisegundos.
const delay = (ms) => ({ "--delay": `${ms}ms` });

/**
 * Hero: es un Server Component (no tiene "use client").
 * Solo las piezas interactivas (fondo y texto animado) se ejecutan en el navegador.
 */
export default function Hero() {
  const { name, role, typedRoles, headline, description, isAvailable, socials } = profile;

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <HeroBackground />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          {isAvailable && (
            <p className={`${styles.badge} ${styles.reveal}`} style={delay(0)}>
              <span className={styles.pulse} aria-hidden="true" />
              Disponible para nuevas oportunidades
            </p>
          )}

          <p className={`${styles.greeting} ${styles.reveal}`} style={delay(100)}>
            Hola, mi nombre es
          </p>

          <h1 id="hero-title" className={`${styles.title} ${styles.reveal}`} style={delay(180)}>
            {name}
          </h1>

          <p className={`${styles.role} ${styles.reveal}`} style={delay(260)}>
            <span className="sr-only">{headline}</span>
            <span aria-hidden="true">
              {role} <Typewriter words={typedRoles} />
            </span>
          </p>

          <p className={`${styles.description} ${styles.reveal}`} style={delay(340)}>
            {description}
          </p>

          <div className={`${styles.actions} ${styles.reveal}`} style={delay(420)}>
            <Button href="/#proyectos">
              Ver proyectos
              <ArrowRightIcon />
            </Button>
            <Button href="/#contacto" variant="secondary">
              Contactarme
              <MailIcon />
            </Button>
          </div>

          <div className={`${styles.socials} ${styles.reveal}`} style={delay(500)}>
            <span className={styles.socialsLabel}>Encontrame en</span>
            <ul className={styles.socialList} role="list">
              {socials.map(({ id, label, href }) => {
                const Icon = socialIcons[id];
                return (
                  <li key={id}>
                    <a
                      href={href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (se abre en una pestaña nueva)`}
                      data-tooltip={label}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={`${styles.visual} ${styles.reveal}`} style={delay(350)}>
          <CodeWindow />
        </div>
      </div>

      <a href="#sobre-mi" className={styles.scrollIndicator} aria-label="Ir a la sección Sobre mí">
        <span className={styles.mouse} aria-hidden="true">
          <span className={styles.wheel} />
        </span>
        <span aria-hidden="true">Scroll</span>
      </a>
    </section>
  );
}
