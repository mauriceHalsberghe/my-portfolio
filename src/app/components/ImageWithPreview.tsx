"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../ui/imageModal.module.css";

type Props = {
  src: string;
  alt?: string;
  images: string[];
  index: number;
  className?: string;
  width?: number;
  height?: number;
};

export default function ImageWithPreview({
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
        className={className}
        onClick={() => openAt(index)}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={src}
          alt={alt ?? "image"}
          width={width ?? 600}
          height={height ?? 400}
          className={styles.inlineImage}
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
            <Image src={'/svg/chevron-left.svg'} width={50} height={50} alt={'<'} />
          </button>
          <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[cur]}
              alt={alt ?? "image"}
              width={1400}
              height={800}
              className={styles.fullImage}
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
            <Image src={'/svg/chevron-right.svg'} width={50} height={50} alt={'>'} />
          </button>
        </div>
      )}
    </>
  );
}
