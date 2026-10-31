// Datos personales del portfolio.
// Al centralizar el contenido acá, los componentes solo se ocupan de mostrarlo.

export const profile = {
  name: "Juan Pablo Torasso",
  initials: "JPT",
  role: "Desarrollador",
  // Frases que va escribiendo la animación del Hero.
  typedRoles: [
    "Full Stack .NET",
    "C# & ASP.NET Core",
    "Blazor & SQL Server",
    "de soluciones empresariales",
  ],
  // Versión estática del rol: la leen los lectores de pantalla y los buscadores.
  headline:
    "Desarrollador Full Stack .NET especializado en C#, ASP.NET Core, Blazor y SQL Server.",
  description:
    "Construyo sistemas empresariales robustos con C# y .NET: gestión, stock, ventas y automatizaciones que resuelven problemas reales de negocio. También desarrollo interfaces modernas con JavaScript y React.",
  isAvailable: true,
  // TODO: tu correo real. Se usa en la sección Contacto y en el formulario.
  email: "tu-email@ejemplo.com",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/jptorasso" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/juanpablotorasso/",
    },
  ],
};
