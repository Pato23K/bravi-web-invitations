"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
/** Conserva la composición incluso si falta una fotografía. */
export function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span role="img" aria-label={props.alt} className="media-fallback"><span aria-hidden="true">✧</span><span>{props.alt}</span></span>;
  return <Image {...props} onError={() => setFailed(true)} />;
}
