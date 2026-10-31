import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// useSyncExternalStore es el hook de React para "suscribirse" a algo que vive
// fuera de React (acá, una preferencia del sistema operativo).
function subscribe(onChange) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// En el servidor no existe `window`: asumimos que se permiten animaciones.
const getServerSnapshot = () => false;

/** Devuelve true si el usuario pidió reducir las animaciones en su sistema. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
