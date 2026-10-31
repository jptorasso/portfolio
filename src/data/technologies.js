// Tecnologías agrupadas por categoría.
// `level` puede ser "mastered" (Domino) o "learning" (Aprendiendo).
// `short` es el texto del logo y `color`, su color (tonos claros para que se lean sobre fondo oscuro).
// TODO: ajustá los niveles a tu experiencia real y agregá tecnologías cuando las sumes.

export const techCategories = [
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    description: "APIs, lógica de negocio y acceso a datos para sistemas empresariales.",
    technologies: [
      { id: "csharp", name: "C#", short: "C#", color: "#c084fc", level: "mastered" },
      { id: "dotnet", name: ".NET", short: ".NET", color: "#a78bfa", level: "mastered" },
      { id: "aspnet", name: "ASP.NET Core", short: "ASP", color: "#818cf8", level: "mastered" },
      { id: "efcore", name: "Entity Framework Core", short: "EF", color: "#c4b5fd", level: "mastered" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    description: "Interfaces web: Blazor en el ecosistema .NET y React con Next.js.",
    technologies: [
      { id: "blazor", name: "Blazor", short: "Bz", color: "#d8b4fe", level: "mastered" },
      { id: "html", name: "HTML", short: "</>", color: "#fb923c", level: "mastered" },
      { id: "css", name: "CSS", short: "{ }", color: "#60a5fa", level: "mastered" },
      { id: "javascript", name: "JavaScript", short: "JS", color: "#facc15", level: "mastered" },
      { id: "react", name: "React", short: "Re", color: "#67e8f9", level: "mastered" },
      { id: "nextjs", name: "Next.js", short: "N", color: "#f4f4f5", level: "learning" },
    ],
  },
  {
    id: "database",
    title: "Bases de datos",
    icon: "database",
    description: "Modelado relacional y consultas para sistemas de gestión.",
    technologies: [
      { id: "sqlserver", name: "SQL Server", short: "SQL", color: "#f87171", level: "mastered" },
    ],
  },
  {
    id: "tools",
    title: "Herramientas",
    icon: "wrench",
    description: "Entorno de desarrollo y control de versiones.",
    technologies: [
      { id: "visualstudio", name: "Visual Studio", short: "VS", color: "#c084fc", level: "mastered" },
      { id: "git", name: "Git", short: "git", color: "#fb923c", level: "mastered" },
      { id: "github", name: "GitHub", short: "GH", color: "#e4e4e7", level: "mastered" },
    ],
  },
];
