import Reveal from "@/components/ui/Reveal/Reveal";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { techCategories } from "@/data/technologies";
import TechExplorer from "./TechExplorer";
import styles from "./Technologies.module.css";

/**
 * Sección "Tecnologías". Es un Server Component: lee los datos y se los pasa
 * a TechExplorer, que es la única parte con estado (el filtro).
 */
export default function Technologies() {
  const allTechnologies = techCategories.flatMap(({ technologies }) => technologies);

  // Duplicamos la lista para que la marquesina pueda repetirse sin cortes.
  const marqueeItems = [...allTechnologies, ...allTechnologies];

  return (
    <section id="tecnologias" className={styles.technologies} aria-labelledby="tecnologias-title">
      <div className="container">
        <SectionHeader
          titleId="tecnologias-title"
          number="02"
          eyebrow="Tecnologías"
          title="Mi **stack** tecnológico"
          description="Las herramientas que uso para construir software empresarial y las que estoy incorporando para el frontend moderno."
        />

        <TechExplorer categories={techCategories} />
      </div>

      {/* Decorativa: la información ya está en las tarjetas, así que la ocultamos a lectores de pantalla */}
      <Reveal className={styles.marquee} aria-hidden="true">
        <ul className={styles.track} role="list">
          {marqueeItems.map(({ id, name, color }, index) => (
            <li key={`${id}-${index}`} className={styles.marqueeItem} style={{ "--tech-color": color }}>
              <span className={styles.marqueeDot} />
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
