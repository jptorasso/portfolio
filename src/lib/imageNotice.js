// Avisos sobre las imágenes de los proyectos (ver `imageNotice` en data/projects.js).
//
// Está en un módulo propio, sin importar datos, a propósito: lo usan componentes
// que corren en el navegador, y así no arrastran al bundle todos los proyectos.

export const ILLUSTRATIVE_LABEL = "Vista ilustrativa";

export const imageNoticeTexts = {
  confidential:
    "Las capturas reales no se publican por confidencialidad del cliente. Las imágenes son vistas ilustrativas: puedo mostrar el sistema funcionando en una entrevista.",
  illustrative: "Las imágenes son vistas ilustrativas del sistema.",
};

// Versión corta, para la galería (el texto completo ya aparece debajo de la portada).
export const imageNoticeShortTexts = {
  confidential: "Vistas ilustrativas por confidencialidad del cliente.",
  illustrative: "Vistas ilustrativas del sistema.",
};

/** Texto alternativo honesto: si la imagen es ilustrativa, lo aclara también para lectores de pantalla. */
export const describeImage = (alt, imageNotice) => (imageNotice ? `${ILLUSTRATIVE_LABEL}: ${alt}` : alt);
