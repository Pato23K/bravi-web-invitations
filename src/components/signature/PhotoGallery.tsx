"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GalleryPhoto } from "@/types/invitation";

export interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  title?: string;
}

export const MAX_GALLERY_PHOTOS = 5;

/**
 * Comp. 7a · Plan Signature. Carrusel táctil (hasta 5 fotos) con CSS scroll-snap:
 * el deslizamiento es nativo del navegador, sin librerías externas.
 */
export function PhotoGallery({ photos, title = "Nuestra historia" }: PhotoGalleryProps) {
  const items = photos.slice(0, MAX_GALLERY_PHOTOS);
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Marca como activa la foto que está centrada en pantalla.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [items.length]);

  const goTo = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  if (items.length === 0) return null;

  return (
    <section id="galeria" className="py-16">
      <div className="px-6">
        <SectionHeading eyebrow="Momentos" title={title} />
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7%]"
        aria-label="Galería de fotos"
      >
        {items.map((photo, index) => (
          <li
            key={photo.src}
            ref={(el: HTMLLIElement | null) => {
              slideRefs.current[index] = el;
            }}
            data-index={index}
            className="relative aspect-[4/5] w-[86%] shrink-0 snap-center overflow-hidden rounded-3xl bg-accent/20 shadow-md"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${items.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 448px) 86vw, 385px"
              className="object-cover"
              priority={index === 0}
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ver foto ${index + 1}`}
            aria-current={index === active}
            className={`h-2 rounded-full transition-all ${
              index === active ? "w-6 bg-primary" : "w-2 bg-accent/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
