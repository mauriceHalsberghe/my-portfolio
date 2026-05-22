"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import styles from "./image-preview.module.css";

type Props = {
  src: string;
  alt?: string;
  images: string[];
  index: number;
  className?: string;
  width?: number;
  height?: number;
};

const PLACEHOLDER = "/images/placeholder.png";

export default function ImagePreview({
  src,
  alt,
  images,
  index,
  className,
  width,
  height,
}: Props) {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(index);
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
  const [gallerySrcs, setGallerySrcs] = useState(
    images.map((i) => i || PLACEHOLDER)
  );
  const triggerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const EASE = 0.2;

  function tick() {
    const el = triggerRef.current;
    if (!el) {
      rafId.current = null;
      return;
    }
    pos.current.x += (target.current.x - pos.current.x) * EASE;
    pos.current.y += (target.current.y - pos.current.y) * EASE;
    el.style.setProperty("--mouse-x", `${pos.current.x}px`);
    el.style.setProperty("--mouse-y", `${pos.current.y}px`);
    rafId.current = requestAnimationFrame(tick);
  }

  function handleEnter(e: MouseEvent<HTMLDivElement>) {
    pos.current = { x: e.clientX, y: e.clientY };
    target.current = { x: e.clientX, y: e.clientY };
    if (rafId.current === null) rafId.current = requestAnimationFrame(tick);
  }

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    target.current.x = e.clientX;
    target.current.y = e.clientY;
  }

  function handleLeave() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openAt(i: number) {
    setCur(i);
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function next() {
    setCur((c) => (c + 1) % images.length);
  }
  function prev() {
    setCur((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={`${className ?? ""} ${styles.trigger}`}
        data-label="Click for preview"
        onClick={() => openAt(index)}
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Image
          src={imgSrc}
          alt={alt ?? "image"}
          width={width ?? 600}
          height={height ?? 400}
          className={styles.inlineImage}
          onError={() => setImgSrc(PLACEHOLDER)}
        />
      </div>

      {open && (
        <div
          className={styles.overlay}
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className={styles.prev}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <Image src={"/svg/chevron-left.svg"} width={50} height={50} alt={"<"} />
          </button>
          <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallerySrcs[cur]}
              alt={alt ?? "image"}
              width={1400}
              height={800}
              className={styles.fullImage}
              onError={() =>
                setGallerySrcs((prev) =>
                  prev.map((s, i) => (i === cur ? PLACEHOLDER : s))
                )
              }
            />
            <div className={styles.counter}>
              {cur + 1} / {images.length}
            </div>
          </div>
          <button
            className={styles.next}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <Image src={"/svg/chevron-right.svg"} width={50} height={50} alt={">"} />
          </button>
        </div>
      )}
    </>
  );
}