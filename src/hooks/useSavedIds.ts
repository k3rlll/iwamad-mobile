import { useEffect, useRef, useState } from 'react';
import { loadSavedIds, storeSavedIds } from '../lib/savedStorage';

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const currentIds = useRef<number[]>([]);
  const ready = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const load = loadSavedIds().catch(() => []);
    const hydration = load.then((ids) => {
      if (ready.current === hydration) {
        currentIds.current = ids;
        setSavedIds(ids);
      }
    });
    ready.current = hydration;
    return () => {
      ready.current = null;
    };
  }, []);

  async function toggleSaved(id: number) {
    const hydration = ready.current;
    await hydration;
    if (!hydration || ready.current !== hydration) {
      return;
    }

    const ids = currentIds.current;
    const next = ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id];
    currentIds.current = next;
    setSavedIds(next);
    await storeSavedIds(next).catch((error) => console.warn('Could not save events', error));
  }

  return { savedIds, toggleSaved };
}
