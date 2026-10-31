import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons/Icons";
import Reveal from "@/components/ui/Reveal/Reveal";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { profile } from "@/data/profile";
import ContactForm from "./ContactForm";
import CopyEmailButton from "./CopyEmailButton";
import styles from "./Contact.module.css";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const socialDescriptions = {
  github: "Código y proyectos",
  linkedin: "Experiencia y contacto profesional",
};

/** Sección "Contacto": canales directos + formulario. */
export default function Contact() {
  const { email, socials, isAvailable } = profile;

  return (
    <section id="contacto" className={styles.contact} aria-labelledby="contacto-title">
      <div className="container">
        <SectionHeader
          titleId="contacto-title"
          number="05"
          eyebrow="Contacto"
          title="Trabajemos **juntos**"
          description="¿Tenés una oportunidad laboral o un proyecto en mente? Escribime y conversemos."
        />

        <div className={styles.grid}>
          <Reveal className={styles.channels}>
            {isAvailable && (
              <p className={styles.availability}>
                <span className={styles.availabilityDot} aria-hidden="true" />
                Disponible para nuevas oportunidades
              </p>
            )}

            <ul className={styles.channelList} role="list">
              <li className={styles.channel}>
                <span className={styles.channelIcon}>
                  <MailIcon />
                </span>
                <div className={styles.channelBody}>
                  <span className={styles.channelLabel}>Email</span>
                  <a href={`mailto:${email}`} className={styles.channelValue}>
                    {email}
                  </a>
                </div>
                <CopyEmailButton email={email} />
              </li>

              {socials.map(({ id, label, href }) => {
                const Icon = socialIcons[id];
                return (
                  <li key={id} className={styles.channel}>
                    <span className={styles.channelIcon}>
                      <Icon />
                    </span>
                    <div className={styles.channelBody}>
                      <span className={styles.channelLabel}>{label}</span>
                      <a
                        href={href}
                        className={`${styles.channelValue} ${styles.channelLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {socialDescriptions[id]}
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </a>
                    </div>
                    <ArrowRightIcon size={16} className={styles.channelArrow} />
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm recipientEmail={email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
