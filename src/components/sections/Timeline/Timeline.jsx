import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { timelineEntries, timelineTypes } from "@/data/timeline";
import TimelineExplorer from "./TimelineExplorer";
import styles from "./Timeline.module.css";

// process.env.NODE_ENV vale "development" con `npm run dev` y "production" en el build.
const isDevelopment = process.env.NODE_ENV === "development";

/** Sección "Experiencia y formación". */
export default function Timeline() {
  // Los borradores solo se ven mientras desarrollás: nunca llegan al sitio publicado.
  const entries = timelineEntries.filter(({ draft }) => isDevelopment || !draft);

  return (
    <section id="experiencia" className={styles.timeline} aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHeader
          titleId="experiencia-title"
          number="04"
          eyebrow="Trayectoria"
          title="Experiencia y **formación**"
          description="Mi recorrido profesional y académico, y lo que estoy aprendiendo hoy."
        />

        <TimelineExplorer entries={entries} types={timelineTypes} />
      </div>
    </section>
  );
}
