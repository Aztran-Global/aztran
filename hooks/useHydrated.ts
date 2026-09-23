import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return () => {};
}

/**
 * True only once the client has hydrated. Avoids SSR/CSR markup mismatches for
 * values that only exist in the browser (theme, matchMedia, localStorage).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
