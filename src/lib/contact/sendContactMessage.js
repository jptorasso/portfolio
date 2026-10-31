import { profile } from "@/data/profile";

// Punto ÚNICO de envío del formulario. El componente solo llama a esta función,
// así que cambiar de proveedor no obliga a tocar el formulario.
//
// Hoy: "mailto" → abre la aplicación de correo del visitante con el mensaje
// ya escrito. No se envía nada a ningún servidor.
//
// TODO: cuando definamos el proveedor (por ejemplo, un Route Handler de Next.js
// con un servicio de email), agregamos el método "api" acá.
export const CONTACT_METHOD = "mailto";

/** Arma un enlace mailto: con asunto y cuerpo. encodeURIComponent escapa espacios, tildes y saltos de línea. */
export function buildMailtoUrl({ name, email, subject, message }) {
  const mailSubject = `[Portfolio] ${subject} — ${name.trim()}`;
  const mailBody = `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
}

/**
 * Envía el mensaje con el método configurado.
 * Es async aunque hoy no espere nada: así, cuando el envío sea una petición
 * a una API (que sí es asíncrona), el formulario no va a necesitar cambios.
 */
export async function sendContactMessage(values) {
  if (CONTACT_METHOD === "mailto") {
    window.location.href = buildMailtoUrl(values);
    return { method: "mailto" };
  }

  throw new Error("El envío de mensajes todavía no está configurado.");
}
