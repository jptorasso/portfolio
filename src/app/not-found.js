import Button from "@/components/ui/Button/Button";
import { ArrowLeftIcon } from "@/components/ui/Icons/Icons";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Página no encontrada",
};

/** Next.js muestra este componente cuando una ruta no existe o se llama a notFound(). */
export default function NotFound() {
  return (
    <section className={styles.notFound} aria-labelledby="not-found-title">
      <p className={styles.code}>404</p>
      <h1 id="not-found-title" className={styles.title}>
        Esta página no existe
      </h1>
      <p className={styles.text}>Puede que el enlace esté mal escrito o que el contenido se haya movido.</p>
      <Button href="/">
        <ArrowLeftIcon size={16} />
        Volver al inicio
      </Button>
    </section>
  );
}
