// Detecta fragmentos entre **dobles asteriscos**. Los paréntesis del regex
// "capturan" el separador, así split() lo conserva en el resultado.
const HIGHLIGHT_PATTERN = /(\*\*[^*]+\*\*)/g;

/**
 * Convierte "Hola **mundo**" en ["Hola ", <strong>mundo</strong>].
 * Permite escribir textos en los archivos de datos y resaltar palabras
 * sin meter HTML ni JSX dentro de los datos.
 */
export function renderHighlights(text) {
  return text.split(HIGHLIGHT_PATTERN).map((part, index) => {
    const isHighlight = part.startsWith("**") && part.endsWith("**");
    return isHighlight ? <strong key={index}>{part.slice(2, -2)}</strong> : part;
  });
}
