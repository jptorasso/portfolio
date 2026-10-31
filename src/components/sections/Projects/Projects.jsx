import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { projectCategories, projects } from "@/data/projects";
import { toProjectCard } from "@/lib/projects";
import ProjectExplorer from "./ProjectExplorer";
import styles from "./Projects.module.css";

/** Sección "Proyectos": prepara los datos en el servidor y delega la interacción. */
export default function Projects() {
  // map con una función ya definida: es lo mismo que projects.map((p) => toProjectCard(p))
  const projectCards = projects.map(toProjectCard);

  return (
    <section id="proyectos" className={styles.projects} aria-labelledby="proyectos-title">
      <div className="container">
        <SectionHeader
          titleId="proyectos-title"
          number="03"
          eyebrow="Proyectos"
          title="Proyectos **destacados**"
          description="Sistemas reales construidos con C# y .NET para resolver necesidades concretas de negocio."
        />

        <ProjectExplorer projects={projectCards} categories={projectCategories} />
      </div>
    </section>
  );
}
