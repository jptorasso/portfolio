import Link from "next/link";
import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons/Icons";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

/** Pie de página: se muestra en todas las páginas (está en el layout raíz). */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.tagline}>
            Diseñado y desarrollado por {profile.name}.
            <br />
            Hecho con Next.js, React y CSS Modules.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className={styles.links} role="list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <Link href={`/#${id}`} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ul className={styles.socials} role="list">
            {profile.socials.map(({ id, label, href }) => {
              const Icon = socialIcons[id];
              return (
                <li key={id}>
                  <a href={href} className={styles.social} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
          <Link href="/#inicio" className={styles.backToTop}>
            Volver arriba
            <ArrowUpIcon size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
