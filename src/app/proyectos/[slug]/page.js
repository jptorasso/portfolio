import { Suspense } from "react";
import ProjectDetail from "@/components/project/ProjectDetail/ProjectDetail";
import ProjectSkeleton from "@/components/project/ProjectSkeleton/ProjectSkeleton";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/lib/projects";

/**
 * Le dice a Next.js qué páginas generar en el build: una por proyecto.
 * Resultado: [{ slug: "brumar" }, { slug: "gestion-comercial" }, ...]
 */
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

/** Título y descripción propios de cada proyecto (SEO). */
export async function generateMetadata({ params }) {
  const { slug } = await params; // en Next.js 16, params es una Promise
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

/**
 * La página no espera a `params`: se lo pasa a ProjectDetail dentro de <Suspense>.
 * Así Next.js puede mostrar el esqueleto al instante al navegar, y el contenido
 * del proyecto (que ya está prerenderizado) aparece apenas se resuelve.
 */
export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}
