import { useState, useEffect } from "react";

export default function useIntersectionObserver(ref, options) {
  const [entry, setEntry] = useState();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => setEntry(e), options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return entry;
}