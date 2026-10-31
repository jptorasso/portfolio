"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cx } from "@/lib/cx";
import ScrollProgress from "./ScrollProgress";
import styles from "./Navbar.module.css";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled(16);
  const activeId = useActiveSection(sectionIds);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Con el menú móvil abierto: bloquear el scroll del fondo y cerrar con Escape.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus(); // devolvemos el foco al botón
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Si la ventana se agranda a tamaño escritorio, cerramos el menú móvil.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Función auxiliar para no repetir el mismo <Link> en escritorio y móvil.
  const renderLink = ({ id, label }, index, className) => (
    <li key={id} style={{ "--index": index }}>
      <Link
        href={`/#${id}`}
        className={className}
        aria-current={activeId === id ? "location" : undefined}
        onClick={closeMenu}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <header className={cx(styles.header, (isScrolled || isMenuOpen) && styles.scrolled)}>
        <ScrollProgress />

        <nav className={cx("container", styles.nav)} aria-label="Navegación principal">
          <Link href="/#inicio" className={styles.logo} onClick={closeMenu}>
            <span className={styles.bracket} aria-hidden="true">
              {"<"}
            </span>
            <span className="sr-only">{profile.name} — Inicio</span>
            <span aria-hidden="true">{profile.initials}</span>
            <span className={styles.bracket} aria-hidden="true">
              {" />"}
            </span>
          </Link>

          <ul className={styles.links} role="list">
            {navLinks.map((link, index) => renderLink(link, index, styles.link))}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            className={cx(styles.menuButton, isMenuOpen && styles.menuButtonOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={toggleMenu}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </nav>
      </header>

      {/* Menú móvil: `inert` lo saca del foco del teclado y de los lectores de pantalla cuando está cerrado */}
      <nav
        id="mobile-menu"
        className={cx(styles.mobileMenu, isMenuOpen && styles.mobileMenuOpen)}
        aria-label="Navegación móvil"
        inert={!isMenuOpen}
      >
        <ul className={styles.mobileLinks} role="list">
          {navLinks.map((link, index) => renderLink(link, index, styles.mobileLink))}
        </ul>
        <p className={styles.mobileFooter}>
          <span className={styles.statusDot} aria-hidden="true" />
          Disponible para nuevas oportunidades
        </p>
      </nav>
    </>
  );
}
