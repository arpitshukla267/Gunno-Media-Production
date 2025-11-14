import { useEffect, useMemo, useState } from 'react';

/**
 * Preloads an array of image sources and returns a boolean once all images are ready.
 * Falls back gracefully if the browser blocks loading or if a source is empty.
 */
export function useImagePreloader(sources = []) {
  const [isReady, setIsReady] = useState(false);
  const normalizedSources = useMemo(
    () => [...new Set((sources ?? []).filter(Boolean))],
    [sources]
  );

  useEffect(() => {
    if (!normalizedSources.length) {
      setIsReady(true);
      return;
    }

    let isCancelled = false;

    const preloaders = normalizedSources.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.decoding = 'async';
          img.src = src;
        })
    );

    Promise.all(preloaders).then(() => {
      if (!isCancelled) {
        setIsReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [normalizedSources]);

  return isReady;
}

