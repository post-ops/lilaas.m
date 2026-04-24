import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    // Observe all .reveal children
    const reveals = el.querySelectorAll(".reveal");
    reveals.forEach((r) => observer.observe(r));

    // Also observe the element itself if it has .reveal
    if (el.classList.contains("reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
