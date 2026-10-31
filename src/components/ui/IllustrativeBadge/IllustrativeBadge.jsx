import { LockIcon } from "@/components/ui/Icons/Icons";
import { ILLUSTRATIVE_LABEL } from "@/lib/imageNotice";
import styles from "./IllustrativeBadge.module.css";

/**
 * Etiqueta "Vista ilustrativa" que se apoya sobre una imagen.
 * El contenedor de la imagen tiene que tener `position: relative`.
 * Es decorativa (aria-hidden): el texto alternativo de la imagen ya lo aclara.
 */
export default function IllustrativeBadge({ notice }) {
  if (!notice) return null;

  return (
    <span className={styles.badge} aria-hidden="true">
      {notice === "confidential" && <LockIcon size={12} />}
      {ILLUSTRATIVE_LABEL}
    </span>
  );
}
