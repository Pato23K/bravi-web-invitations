"use client";
import { useEffect, useState } from "react";
import { SafeImage } from "@/components/common/SafeImage";
export function HeroMedia({ videoSrc, posterSrc }: { videoSrc?: string; posterSrc?: string }) {
  const [failed, setFailed] = useState(false);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return <div className="absolute inset-0 hero-media" aria-hidden="true">
    {posterSrc && <SafeImage src={posterSrc} alt="" fill sizes="100vw" priority className="object-cover" />}
    {videoSrc && motion && !failed && <video className="absolute inset-0 h-full w-full object-cover" src={videoSrc} poster={posterSrc} autoPlay muted loop playsInline preload="metadata" onError={() => setFailed(true)} />}
  </div>;
}
