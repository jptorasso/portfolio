// Reglas de validación del formulario de contacto.
// Es una función pura: recibe los valores y devuelve los errores.
// No depende de React, así que la podemos reutilizar (por ejemplo, en el servidor
// cuando conectemos el envío real: NUNCA hay que confiar solo en la validación del navegador).

export const MESSAGE_LIMITS = { min: 20, max: 1000 };

export const SUBJECT_OPTIONS = ["Oportunidad laboral", "Proyecto freelance", "Consulta técnica", "Otro"];

// Algo@algo.algo, sin espacios. No es perfecto (ningún regex de email lo es), pero detecta los errores comunes.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Devuelve un objeto con un mensaje por cada campo inválido.
 * Si el objeto está vacío, el formulario es válido.
 */
export function validateContact({ name, email, subject, message }) {
  const errors = {};

  const trimmedName = name.trim();
  if (!trimmedName) errors.name = "Ingresá tu nombre.";
  else if (trimmedName.length < 2) errors.name = "El nombre es demasiado corto.";

  const trimmedEmail = email.trim();
  if (!trimmedEmail) errors.email = "Ingresá tu correo electrónico.";
  else if (!EMAIL_PATTERN.test(trimmedEmail)) errors.email = "El correo no parece válido. Ejemplo: nombre@empresa.com";

  if (!SUBJECT_OPTIONS.includes(subject)) errors.subject = "Elegí el motivo del mensaje.";

  const messageLength = message.trim().length;
  if (messageLength === 0) errors.message = "Escribí tu mensaje.";
  else if (messageLength < MESSAGE_LIMITS.min)
    errors.message = `Contame un poco más: mínimo ${MESSAGE_LIMITS.min} caracteres (llevás ${messageLength}).`;
  else if (messageLength > MESSAGE_LIMITS.max) errors.message = `El mensaje supera los ${MESSAGE_LIMITS.max} caracteres.`;

  return errors;
}
