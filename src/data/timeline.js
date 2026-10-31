// Trayectoria: experiencia, formación y cursos.
//
// El orden del array es el orden en pantalla (lo más reciente primero).
// `description`, `highlights` y `tags` son opcionales.
//
// `draft: true` marca un BORRADOR: se ve en desarrollo (con borde punteado)
// pero NO se publica en producción. Útil para ir cargando entradas de a poco.

// `label` se usa en las pestañas y `badge` en la etiqueta de cada tarjeta.
export const timelineTypes = [
  { id: "experience", label: "Experiencia", badge: "Experiencia", icon: "briefcase" },
  { id: "education", label: "Formación", badge: "Formación", icon: "graduation" },
  { id: "course", label: "Cursos", badge: "Curso", icon: "award" },
];

export const timelineEntries = [
  {
    id: "bza-qa",
    type: "experience",
    title: "QA",
    organization: "BZA Group",
    period: "02/2026 — Actualidad",
    current: true,
  },
  {
    id: "frontend-learning",
    type: "education",
    title: "Next.js y frontend moderno",
    organization: "Formación autodidacta con proyecto práctico",
    period: "2026 — Actualidad",
    current: true,
    description:
      "Construcción de este portfolio desde cero con Next.js y React, con foco en accesibilidad y rendimiento.",
    tags: ["JavaScript", "React", "Next.js", "CSS"],
  },
  {
    id: "bza-support",
    type: "experience",
    title: "Soporte y desarrollo de herramientas",
    organization: "BZA Group",
    period: "11/2022 — 02/2026",
    highlights: [
      "Soporte a usuarios y sucursales: análisis de incidentes y resolución de problemas operativos en sistemas de gestión.",
      "Monitoreo de procesos y desarrollo de herramientas de apoyo para validación, actualización y procesamiento de datos.",
      "Automatizaciones y programas en Visual FoxPro 2.6, integración de archivos y tareas operativas recurrentes.",
    ],
    tags: ["Visual FoxPro 2.6"],
  },
  {
    id: "utn-fullstack",
    type: "education",
    title: "Desarrollo Full Stack",
    organization: "UTN — Facultad Regional Reconquista",
    period: "2025",
  },
  {
    id: "brumar-admin",
    type: "experience",
    title: "Administrativo",
    organization: "Brumar",
    period: "06/2020 — 07/2025",
    description:
      "Uso de la página de AFIP, emisión de remitos electrónicos, presentación de declaraciones juradas, facturación, confección del libro IVA compras y ventas, ingreso de retenciones a través del programa SICORE y gestión de bancos.",
  },
  {
    id: "utn-dotnet",
    type: "education",
    title: "Diplomatura en Programación .NET",
    organization: "UTN — Universidad Tecnológica Nacional",
    period: "2024",
    tags: [".NET"],
  },
  {
    id: "tinysoft",
    type: "experience",
    title: "Prácticas Profesionalizantes",
    organization: "Tinysoft",
    period: "12/2021 — 02/2022",
    description: "Desarrollo de software, programación web y programación backend.",
    tags: ["C#", "SQL"],
  },
  {
    id: "udemy-csharp",
    type: "course",
    title: "C#",
    organization: "Udemy · Curso online",
    period: "2021",
    tags: ["C#"],
  },
  {
    id: "udemy-html",
    type: "course",
    title: "Universidad HTML",
    organization: "Udemy · Curso online",
    period: "2021",
    tags: ["HTML"],
  },
];
