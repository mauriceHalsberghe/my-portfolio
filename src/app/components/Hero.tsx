"use client"

import { useEffect, useState } from "react";
import styles from "../ui/hero.module.css";
import Image from "next/image";


export default function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 250;
      const factor = Math.min(scrollY / maxScroll, 1);

      setOpacity(1 - factor * 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>
        <Image
          width={100}
          height={100}
          src="/name.svg"
          alt="Maurice Halsberghe"
          className={styles.hero__image}
          style={{
            opacity: opacity,
            transition: "opacity 0.2s",
          }}
        />
      </h1>
      <p className={styles.hero__subtitle}>
        Junior Full-Stack Developer
      </p>
    </section>
  );
}