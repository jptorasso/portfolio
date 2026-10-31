"use client";

import { useRef, useState } from "react";
import { AlertCircleIcon, CheckCircleIcon, SendIcon } from "@/components/ui/Icons/Icons";
import { MESSAGE_LIMITS, SUBJECT_OPTIONS, validateContact } from "@/lib/contact/validation";
import { sendContactMessage } from "@/lib/contact/sendContactMessage";
import styles from "./ContactForm.module.css";

const INITIAL_VALUES = { name: "", email: "", subject: "", message: "" };

// Orden de los campos: sirve para enfocar el PRIMER campo con error al enviar.
const FIELD_ORDER = ["name", "email", "subject", "message"];

/** Etiqueta + control + mensaje de ayuda o de error. */
function Field({ id, label, error, hint, isValid, children }) {
  return (
    <div className={styles.field} data-invalid={Boolean(error)} data-valid={isValid}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          <AlertCircleIcon />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function ContactForm({ recipientEmail }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({}); // campos que el usuario ya visitó
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const formRef = useRef(null);

  // Estado derivado: los errores se recalculan en cada render a partir de los valores.
  const errors = validateContact(values);
  const isFormValid = Object.keys(errors).length === 0;

  // Solo mostramos el error de un campo después de que el usuario lo visitó
  // (o intentó enviar). Así no lo "retamos" antes de que empiece a escribir.
  const visibleError = (name) => (touched[name] || hasTriedSubmit ? errors[name] : undefined);

  // UN solo manejador para todos los campos: usa el atributo `name` del input
  // como clave (propiedad computada).
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  // Devuelve todas las props comunes de un campo. Se usan con spread: {...getFieldProps("email")}
  const getFieldProps = (name, { hasHint = false } = {}) => {
    const error = visibleError(name);
    // aria-describedby conecta el campo con su mensaje: el lector de pantalla lo lee al enfocarlo.
    let describedBy;
    if (error) describedBy = `contact-${name}-error`;
    else if (hasHint) describedBy = `contact-${name}-hint`;

    return {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": Boolean(error),
      "aria-describedby": describedBy,
      className: styles.control,
    };
  };

  const isFieldValid = (name) => Boolean(touched[name] && !errors[name]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // evita que el navegador recargue la página
    setHasTriedSubmit(true);

    if (!isFormValid) {
      // Llevamos el foco al primer campo con error. form.elements permite buscar por `name`.
      const firstInvalidField = FIELD_ORDER.find((name) => errors[name]);
      formRef.current.elements[firstInvalidField]?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await sendContactMessage(values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setHasTriedSubmit(false);
    setStatus("idle");
  };

  const messageLength = values.message.trim().length;
  const isNearLimit = messageLength > MESSAGE_LIMITS.max * 0.9;

  return (
    // noValidate: desactiva los globos de error del navegador; validamos nosotros con mensajes propios.
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Field id="contact-name" label="Nombre" error={visibleError("name")} isValid={isFieldValid("name")}>
          <input type="text" autoComplete="name" placeholder="Tu nombre" {...getFieldProps("name")} />
        </Field>

        <Field id="contact-email" label="Correo electrónico" error={visibleError("email")} isValid={isFieldValid("email")}>
          <input type="email" autoComplete="email" inputMode="email" placeholder="nombre@empresa.com" {...getFieldProps("email")} />
        </Field>
      </div>

      <Field id="contact-subject" label="Motivo" error={visibleError("subject")} isValid={isFieldValid("subject")}>
        <select {...getFieldProps("subject")}>
          <option value="" disabled>
            Elegí una opción
          </option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="contact-message"
        label="Mensaje"
        error={visibleError("message")}
        hint={`Mínimo ${MESSAGE_LIMITS.min} caracteres.`}
        isValid={isFieldValid("message")}
      >
        <textarea
          rows={6}
          maxLength={MESSAGE_LIMITS.max}
          placeholder="Contame sobre la oportunidad o el proyecto…"
          {...getFieldProps("message", { hasHint: true })}
        />
        <span className={styles.counter} data-near-limit={isNearLimit} aria-hidden="true">
          {messageLength} / {MESSAGE_LIMITS.max}
        </span>
      </Field>

      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Preparando…
            </>
          ) : (
            <>
              Enviar mensaje
              <SendIcon size={16} />
            </>
          )}
        </button>
        <p className={styles.note}>Se abrirá tu aplicación de correo con el mensaje listo para enviar.</p>
      </div>

      {/* role="status" + aria-live: los lectores de pantalla anuncian el resultado */}
      <div className={styles.feedback} role="status" aria-live="polite">
        {status === "success" && (
          <div className={styles.success}>
            <CheckCircleIcon />
            <div>
              <p className={styles.feedbackTitle}>¡Listo! Tu mensaje está preparado.</p>
              <p className={styles.feedbackText}>
                Terminá de enviarlo desde tu aplicación de correo. Si no se abrió, escribime directamente a{" "}
                <a href={`mailto:${recipientEmail}`}>{recipientEmail}</a>.
              </p>
              <button type="button" className={styles.resetButton} onClick={resetForm}>
                Escribir otro mensaje
              </button>
            </div>
          </div>
        )}
        {status === "error" && (
          <p className={styles.errorBanner}>
            No se pudo preparar el mensaje. Escribime directamente a{" "}
            <a href={`mailto:${recipientEmail}`}>{recipientEmail}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
