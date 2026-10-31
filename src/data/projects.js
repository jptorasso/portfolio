// Proyectos del portfolio.
//
// - `stack` usa los ids de technologies.js (así nombre y color salen de un solo lugar).
// - `libraries` son librerías o herramientas que no están en esa lista.
// - `images`: la primera es la portada (en public/images/projects/<slug>/).
// - `imageNotice`: aclara qué muestran las imágenes.
//     "confidential" → vistas ilustrativas; las capturas reales no se publican por confidencialidad del cliente.
//     "illustrative" → vistas ilustrativas (TODO: reemplazar por capturas reales y poner null).
//     null → capturas reales, sin aviso.
// - `links`: completá `repo` o `demo` si el proyecto es público. Si quedan en null, no se muestran.

export const projectCategories = [
  { id: "empresarial", label: "Sistemas empresariales" },
  { id: "saas", label: "SaaS" },
  { id: "automatizacion", label: "Automatización" },
  { id: "personal", label: "Proyectos personales" },
];

export const projects = [
  {
    slug: "brumar",
    title: "BRUMAR",
    tagline: "Sistema de gestión frigorífica",
    category: "empresarial",
    accent: "#38bdf8",
    summary:
      "Sistema web para un establecimiento frigorífico: producción, tropas, stock, pedidos con circuito de aprobación y etiquetas de palets con código de barras.",
    description: [
      "BRUMAR digitaliza la operación diaria de un establecimiento frigorífico: desde la carga de producción y el seguimiento de tropas hasta la preparación, aprobación y despacho de pedidos.",
      "Cada usuario trabaja según su perfil (administración, delegados y producción) y cada acción sensible está protegida por un permiso propio. Así cada área ve y modifica solo lo que le corresponde.",
    ],
    stack: ["csharp", "dotnet", "aspnet", "blazor", "efcore", "sqlserver"],
    libraries: ["ASP.NET Core Identity", "PDFsharp / MigraDoc"],
    features: [
      "Carga de producción y gestión de tropas.",
      "Control y ajuste de stock.",
      "Pedidos con ciclo completo: creación, preparación, aprobación, anulación y reversión.",
      "Solicitudes de modificación que resuelve un responsable.",
      "Carga de remitos.",
      "Etiquetas de palets en PDF con código de barras Code128.",
      "Panel con gráficos de producción y stock.",
      "Avisos mensuales y gestión de usuarios.",
    ],
    technicalDetails: [
      {
        title: "Permisos por acción",
        description:
          "ASP.NET Core Identity con perfiles (SuperAdmin, Admin, Delegado y Producción) y permisos granulares para cada operación: aprobar, anular, revertir, ajustar stock o imprimir etiquetas.",
      },
      {
        title: "PDF y códigos de barras",
        description:
          "Los pedidos y las etiquetas de palet se generan en el servidor con PDFsharp/MigraDoc, con un codificador Code128 propio para los códigos de barras.",
      },
      {
        title: "Gráficos como componentes",
        description:
          "Componentes Blazor reutilizables para gráficos de barras, columnas, línea y proporción, con un estado vacío común cuando no hay datos.",
      },
      {
        title: "Datos e inicialización",
        description:
          "Entity Framework Core sobre SQL Server con migraciones, y una carga inicial de perfiles y usuarios al poner el sistema en marcha.",
      },
    ],
    images: [
      { src: "/images/projects/brumar/panel.svg", alt: "Panel de control de BRUMAR con producción, stock y pedidos" },
      { src: "/images/projects/brumar/pedidos.svg", alt: "Listado de pedidos de BRUMAR filtrado por estado" },
      { src: "/images/projects/brumar/etiquetas.svg", alt: "Generación de etiquetas de palet con código de barras" },
    ],
    links: { repo: null, demo: null },
    imageNotice: "confidential",
  },
  {
    slug: "gestion-comercial",
    title: "Gestión Comercial SaaS",
    tagline: "Stock, ventas y cuentas corrientes",
    category: "saas",
    accent: "#a78bfa",
    summary:
      "Plataforma de gestión para comercios de repuestos: catálogo, stock con alertas, ventas, presupuestos, cuentas corrientes y reportes exportables.",
    description: [
      "Un sistema pensado para el día a día de un comercio de repuestos de motos: cargar productos, controlar el stock, vender rápido desde el mostrador y llevar las cuentas corrientes de los clientes.",
      "Cada cambio de stock y de precio queda registrado, y los reportes se exportan a Excel y PDF para compartirlos o archivarlos.",
    ],
    stack: ["csharp", "dotnet", "aspnet", "blazor", "efcore", "sqlserver"],
    libraries: ["ASP.NET Core Identity", "ClosedXML", "QuestPDF"],
    features: [
      "Catálogo de productos con categorías, marcas y proveedores.",
      "Carga y modificación de stock con historial.",
      "Alertas de stock bajo el mínimo.",
      "Cambio de precios con historial de precios.",
      "Venta rápida con carrito.",
      "Presupuestos.",
      "Cuentas corrientes de clientes con registro de pagos.",
      "Reportes exportables a Excel y PDF.",
    ],
    technicalDetails: [
      {
        title: "Concurrencia optimista",
        description:
          "Extensiones propias para detectar y resolver conflictos cuando dos usuarios modifican el mismo registro al mismo tiempo.",
      },
      {
        title: "Carrito de venta",
        description:
          "Un servicio dedicado arma la venta en memoria antes de confirmarla, para que la operación en la base sea una sola y consistente.",
      },
      {
        title: "Trazabilidad",
        description:
          "Historiales de stock y de precios: siempre se puede saber quién cambió qué y cuándo.",
      },
      {
        title: "Exportaciones y pruebas",
        description:
          "Excel con ClosedXML, PDF con QuestPDF y un proyecto de pruebas automatizadas para la lógica de negocio.",
      },
    ],
    images: [
      { src: "/images/projects/gestion-comercial/resumen.svg", alt: "Resumen de ventas con indicadores y gráfico de los últimos 30 días" },
      { src: "/images/projects/gestion-comercial/nueva-venta.svg", alt: "Pantalla de nueva venta con buscador de productos y carrito" },
      { src: "/images/projects/gestion-comercial/productos.svg", alt: "Catálogo de productos con precio y estado de stock" },
    ],
    links: { repo: null, demo: null },
    imageNotice: "confidential",
  },
  {
    // TODO: este proyecto tiene una descripción GENÉRICA. Reemplazala por tus
    // automatizaciones reales (qué proceso, qué herramienta, cuánto tiempo ahorró).
    slug: "automatizaciones",
    title: "Automatizaciones Empresariales",
    tagline: "Procesos repetitivos convertidos en tareas automáticas",
    category: "automatizacion",
    accent: "#fbbf24",
    summary:
      "Procesos programados en C# que importan, validan y cruzan datos entre sistemas, generan reportes y avisan por correo, sin intervención manual.",
    description: [
      "Muchas tareas administrativas consisten en copiar datos de un lugar a otro, revisarlos y armar el mismo reporte todos los días. Estas automatizaciones las resuelven solas y en minutos.",
      "Cada proceso deja un registro de su ejecución, así es fácil saber qué se procesó y detectar a tiempo cualquier error.",
    ],
    stack: ["csharp", "dotnet", "sqlserver"],
    libraries: [],
    features: [
      "Importación y validación de archivos Excel y CSV.",
      "Carga y actualización de datos en SQL Server.",
      "Integración entre sistemas mediante APIs.",
      "Generación automática de reportes.",
      "Notificaciones por correo.",
      "Registro de cada ejecución y de sus errores.",
    ],
    technicalDetails: [
      {
        title: "Ejecución programada",
        description: "Procesos que corren en horarios definidos, sin depender de que alguien los inicie.",
      },
      {
        title: "Validación antes de guardar",
        description: "Los datos se validan contra reglas de negocio antes de impactar en la base: lo inválido se informa y no se guarda.",
      },
      {
        title: "Trazabilidad",
        description: "Cada ejecución registra inicio, duración, filas procesadas y errores.",
      },
    ],
    images: [
      { src: "/images/projects/automatizaciones/flujo.svg", alt: "Flujo de automatización de importación diaria de ventas" },
      { src: "/images/projects/automatizaciones/ejecuciones.svg", alt: "Historial de ejecuciones de los procesos automáticos" },
      { src: "/images/projects/automatizaciones/reporte.svg", alt: "Reporte de ventas semanales generado automáticamente en Excel" },
    ],
    links: { repo: null, demo: null },
    imageNotice: "confidential",
  },
  {
    slug: "gastora",
    title: "GASTORA",
    tagline: "Finanzas personales sin dobles cuentas",
    category: "personal",
    accent: "#34d399",
    summary:
      "Aplicación de finanzas personales: gastos en cuotas, resúmenes de tarjeta, gastos compartidos, reintegros laborales, recurrentes y gastos en dólares con cotización automática.",
    description: [
      "GASTORA responde una pregunta que se vuelve difícil con cuotas, tarjetas y gastos compartidos: ¿cuánto gasté realmente y cuánto me deben?",
      "El modelo separa cuatro capas (el hecho económico, el plan de pago, la deuda entre personas y el movimiento de dinero) para que ningún reporte cuente dos veces el mismo importe.",
    ],
    stack: ["csharp", "dotnet", "aspnet", "blazor", "efcore", "sqlserver"],
    libraries: [".NET 10", "ASP.NET Core Identity", "QuestPDF", "ClosedXML", "Docker", "Caddy"],
    features: [
      "Gastos en cuotas y resúmenes de tarjeta de crédito.",
      "Gastos compartidos con devoluciones aplicadas por cuota.",
      "Reintegros laborales con seguimiento de estados.",
      "Gastos e ingresos recurrentes, calendario de vencimientos y recordatorios.",
      "Gastos en dólares con cotizaciones de DolarApi y ArgentinaDatos.",
      "Reportes, gráficos, proyecciones y exportaciones.",
      "Instalable como PWA para usarla desde el celular.",
      "Backups de la información.",
    ],
    technicalDetails: [
      {
        title: "Arquitectura en capas",
        description:
          "Domain, Application, Infrastructure y Web. El dominio no tiene dependencias externas y concentra las reglas de negocio.",
      },
      {
        title: "Importes que siempre cierran",
        description:
          "Los calculadores de cuotas y de partes garantizan que las sumas coincidan al centavo. Los tests lo verifican con miles de casos aleatorios.",
      },
      {
        title: "Datos protegidos",
        description:
          "Filtro global por usuario, control de concurrencia con rowversion, auditoría en la misma transacción y sin borrados en cascada.",
      },
      {
        title: "Despliegue",
        description:
          "Contenedores Docker en un VPS, con Caddy para HTTPS automático y SQL Server Express.",
      },
    ],
    images: [
      { src: "/images/projects/gastora/inicio.svg", alt: "Resumen mensual de GASTORA con gasto por categoría y próximos vencimientos" },
      { src: "/images/projects/gastora/calendario.svg", alt: "Calendario de vencimientos de cuotas, resúmenes y servicios" },
      { src: "/images/projects/gastora/compartidos.svg", alt: "Gastos compartidos con saldo y estado de cada deuda" },
    ],
    links: { repo: null, demo: null },
    imageNotice: "illustrative", // TODO: subir capturas reales de GASTORA y cambiar a null
  },
];
