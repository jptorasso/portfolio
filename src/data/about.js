// Contenido de la sección "Sobre mí".
// Las palabras entre **dobles asteriscos** se muestran resaltadas.

export const about = {
  title: "Software que resuelve **problemas reales**",
  paragraphs: [
    "Soy desarrollador de software especializado en **C# y .NET**. Mi trabajo empieza por entender cómo funciona un negocio y termina en **sistemas confiables** que las personas usan todos los días.",
    "Desarrollé soluciones de **gestión frigorífica**, **comercio, stock y ventas** y **automatización de procesos**, trabajando de punta a punta: modelado de datos con **SQL Server** y **Entity Framework Core**, lógica de negocio con **ASP.NET Core** e interfaces con **Blazor**.",
    "En el frontend también trabajo con **JavaScript y React**, y hoy profundizo en **Next.js**: este portfolio es parte de ese camino. Busco sumarme a un equipo donde pueda aportar mi experiencia en backend y seguir creciendo como desarrollador full stack.",
  ],
  stats: [
    // Calculado desde tus prácticas en Tinysoft (12/2021). Ajustalo si contás distinto.
    { id: "years", value: 4, prefix: "+", label: "años desarrollando software" },
    { id: "projects", value: 4, label: "proyectos destacados" },
    { id: "stack", value: 10, prefix: "+", label: "tecnologías en mi stack" },
  ],
  // `icon` es el nombre de un ícono de Icons.jsx (se resuelve en el componente).
  focusAreas: [
    {
      id: "business",
      icon: "briefcase",
      title: "Sistemas empresariales",
      description:
        "Aplicaciones de gestión que ordenan procesos reales: inventario, ventas, producción y reportes.",
    },
    {
      id: "data",
      icon: "database",
      title: "Datos bien modelados",
      description:
        "Bases de datos en SQL Server pensadas para crecer, con consultas eficientes y Entity Framework Core.",
    },
    {
      id: "automation",
      icon: "zap",
      title: "Automatización e integración",
      description:
        "Tareas repetitivas convertidas en procesos automáticos que ahorran horas de trabajo manual.",
    },
    {
      id: "interfaces",
      icon: "code",
      title: "Interfaces claras",
      description:
        "Pantallas pensadas para quien las usa todos los días, con Blazor y React.",
    },
  ],
};
