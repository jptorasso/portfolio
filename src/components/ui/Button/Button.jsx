import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

/**
 * Botón reutilizable.
 * - Con `href` se renderiza como enlace (<Link>), porque navega.
 * - Sin `href` se renderiza como <button>, porque ejecuta una acción.
 * `variant` puede ser "primary" o "secondary".
 */
export default function Button({ href, variant = "primary", className, children, ...props }) {
  const classes = cx(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
