"use client";
import { useEffect, useRef, type ReactNode } from "react";
/** Mejora progresiva: el contenido sigue visible sin JavaScript. */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.remove("reveal-pending");
        observer.unobserve(node);
      }
    }, { threshold: 0.08 });
    if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("reveal-pending");
    observer.observe(node);
    return () => { observer.disconnect(); node.classList.remove("reveal-pending"); };
  }, []);
  return <div ref={ref} className="scroll-reveal">{children}</div>;
}
