import { useEffect, useState } from "react";

/**
 * Efecto "máquina de escribir": escribe una palabra letra por letra,
 * hace una pausa, la borra y pasa a la siguiente.
 *
 * Cada render programa UN solo paso con setTimeout. Al cambiar el estado,
 * React vuelve a ejecutar el efecto y programa el paso siguiente.
 */
export function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 35, pauseTime = 1800, enabled = true } = {},
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const currentWord = words[wordIndex];
    const isWordComplete = !isDeleting && text === currentWord;
    const isWordErased = isDeleting && text === "";

    let delay = isDeleting ? deleteSpeed : typeSpeed;
    if (isWordComplete) delay = pauseTime;
    if (isWordErased) delay = 400;

    const timeoutId = setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
      } else if (isWordErased) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length); // vuelve a 0 al final
      } else {
        const nextLength = text.length + (isDeleting ? -1 : 1);
        setText(currentWord.slice(0, nextLength));
      }
    }, delay);

    // Si el componente se desmonta o cambian las dependencias, cancelamos el paso pendiente.
    return () => clearTimeout(timeoutId);
  }, [words, wordIndex, text, isDeleting, enabled, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}
