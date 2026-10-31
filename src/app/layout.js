import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { profile } from "@/data/profile";
import "./globals.css";

// next/font descarga las fuentes en el build y las sirve desde tu propio dominio:
// sin pedidos a Google en el navegador y sin saltos de layout al cargar.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Metadata para SEO: Next.js la convierte en etiquetas <title> y <meta>.
export const metadata = {
  title: {
    default: `${profile.name} — Desarrollador Full Stack .NET`,
    template: `%s | ${profile.name}`,
  },
  description: profile.headline,
  keywords: [
    "desarrollador",
    "C#",
    ".NET",
    "ASP.NET Core",
    "Blazor",
    "SQL Server",
    "React",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Desarrollador Full Stack .NET`,
    description: profile.headline,
    type: "website",
    locale: "es_AR",
  },
};

export const viewport = {
  themeColor: "#07070c",
};

export default function RootLayout({ children }) {
  const fontVariables = [inter.variable, spaceGrotesk.variable, jetbrainsMono.variable].join(" ");

  return (
    <html lang="es" className={fontVariables}>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
