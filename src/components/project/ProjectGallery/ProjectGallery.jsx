"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/Icons/Icons";
import { describeImage } from "@/lib/imageNotice";
import styles from "./ProjectGallery.module.css";

/**
 * Galería de imágenes con visor a pantalla completa (lightbox).
 *
 * Usa el elemento nativo <dialog> del navegador. Con showModal() obtenemos gratis:
 * fondo oscuro (::backdrop), cierre con Escape, foco atrapado dentro del diálogo
 * y devolución del foco al botón que lo abrió.
 */
export default function ProjectGallery({ images, title, imageNotice = null }) {
  // null = visor cerrado; un número = índice de la imagen que se está viendo.
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);

  const total = images.length;
  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  // Las actualizaciones funcionales (index => ...) usan siempre el valor más reciente.
  const showPrevious = () => setActiveIndex((index) => (index - 1 + total) % total);
  const showNext = () => setActiveIndex((index) => (index + 1) % total);
  const close = () => setActiveIndex(null);

  // Sincroniza el estado de React con la API imperativa del <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Con el visor abierto, las flechas del teclado cambian de imagen.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % total);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + total) % total);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, total]);

  // Un clic en el área vacía (fuera de la imagen y los botones) cierra el visor.
  const handleDialogClick = (event) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <ul className={styles.thumbnails} role="list">
        {images.map(({ src, alt }, index) => (
          <li key={src}>
            <button
              type="button"
              className={styles.thumbnail}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar imagen ${index + 1} de ${total}: ${describeImage(alt, imageNotice)}`}
            >
              <Image src={src} alt="" fill sizes="(min-width: 768px) 400px, 100vw" className={styles.thumbnailImage} />
              <span className={styles.thumbnailOverlay} aria-hidden="true">
                <ExpandIcon />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* onClose se dispara también al cerrar con Escape: así el estado queda sincronizado */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`Galería de imágenes de ${title}`}
        onClose={close}
        onClick={handleDialogClick}
      >
        {activeImage && (
          <>
            <button type="button" className={styles.closeButton} onClick={close} aria-label="Cerrar galería">
              <CloseIcon size={22} />
            </button>

            <figure className={styles.viewer}>
              <div className={styles.viewerImage}>
                {/* La key fuerza a React a montar una imagen nueva: así se repite la animación */}
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={describeImage(activeImage.alt, imageNotice)}
                  fill
                  sizes="90vw"
                />
              </div>
              <figcaption className={styles.caption}>
                <span>{describeImage(activeImage.alt, imageNotice)}</span>
                <span className={styles.counter}>
                  {activeIndex + 1} / {total}
                </span>
              </figcaption>
            </figure>

            {total > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.prev}`}
                  onClick={showPrevious}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.next}`}
                  onClick={showNext}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
