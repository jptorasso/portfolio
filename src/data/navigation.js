// Enlaces del navbar. Cada `id` coincide con el id de una <section> de la página.
export const navLinks = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
];

// Ids que observa el navbar para resaltar la sección visible.
// Se calcula una sola vez al cargar el módulo, así el array es siempre el mismo
// (importante para las dependencias de useEffect).
export const sectionIds = ["inicio", ...navLinks.map(({ id }) => id)];
