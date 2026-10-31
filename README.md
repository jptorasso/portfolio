# Portfolio — Juan Pablo Torasso

Portfolio profesional construido con **Next.js (App Router)**, **React** y **JavaScript**, con estética *Dark Tech Premium*.

🌐 **Sitio publicado:** https://portfolio-gamma-rose-y5fd75nqah.vercel.app

Cada cambio que se sube a la rama `main` se publica automáticamente en Vercel.

## Requisitos

- Node.js 20 o superior (LTS recomendado)
- npm

## Scripts

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run lint     # revisa el código con ESLint
npm run build    # build de producción
npm start        # sirve el build de producción
```

## Estructura

```
src/
├── app/                    # Rutas de Next.js (App Router)
│   ├── layout.js           # Layout raíz: fuentes, metadata SEO, navbar
│   ├── page.js             # Página de inicio
│   ├── globals.css         # Tokens de diseño, reset y utilidades
│   └── icon.svg            # Favicon
├── components/
│   ├── layout/Navbar/      # Navbar responsive + barra de progreso
│   ├── sections/Hero/      # Sección Hero (fondo interactivo, typewriter, código)
│   └── ui/                 # Componentes reutilizables (Button, Icons)
├── data/                   # Contenido editable (perfil, navegación)
└── hooks/                  # Hooks personalizados de React
```

## Personalización

Editá `src/data/profile.js` con tu nombre, descripción y enlaces a redes.
