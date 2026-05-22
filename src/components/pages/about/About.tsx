"use client";
import { ComponentType, useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

import { JavaScriptIcon } from "../../icons/JavaScriptIcon";
import { PHPIcon } from "../../icons/PHPIcon";
import { TypeScriptIcon } from "../../icons/TypeScriptIcon";
import { ReactIcon } from "../../icons/ReactIcon";
import { PythonIcon } from "../../icons/PythonIcon";
import { HTMLIcon } from "../../icons/HTMLIcon";
import { CSSIcon } from "../../icons/CSSIcon";
import { GitIcon } from "../../icons/GitIcon";
import { CSharpIcon } from "../../icons/CSharpIcon";
import { TechIcon } from "../../icons/TechIcon";

interface Tech {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  rating: number;
}

type TechEntry = {
  name: string;
  info: string;
  rating: number;
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  JavaScript: JavaScriptIcon,
  PHP: PHPIcon,
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  Python: PythonIcon,
  HTML: HTMLIcon,
  CSS: CSSIcon,
  Git: GitIcon,
  'C#': CSharpIcon,
};

export default function About() {
  const [intro, setIntro] = useState("");
  const [techStack, setTechStack] = useState<Tech[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const animatePlaybackRate = (to: number) => {
    const anim = marqueeRef.current?.getAnimations()[0];
    if (!anim) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = anim.playbackRate;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 1000, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      anim.playbackRate = from + (to - from) * eased;
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else { anim.playbackRate = to; rafRef.current = null; }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data: { intro: string; tech: TechEntry[] }) => {
        setIntro(data.intro);
        setTechStack(
          data.tech.map((t) => ({
            name: t.name,
            rating: t.rating,
            Icon: iconMap[t.name] ?? TechIcon,
          }))
        );
      });
  }, []);

  const handleCardClick = (name: string) => {
    if (!isMobile.current) return;
    if (activeCard === name) {
      setActiveCard(null);
      animatePlaybackRate(1);
    } else {
      setActiveCard(name);
      animatePlaybackRate(0);
    }
  };

  const renderCard = (tech: Tech, key: string) => (
    <div
      key={key}
      className={`${styles.about__card}${activeCard === tech.name ? ` ${styles["about__card--active"]}` : ""}`}
      onClick={() => handleCardClick(tech.name)}
    >
      <tech.Icon className={styles.about__image} />
      <div className={styles.about__cardInfo}>
        <span className={styles.about__cardName}>{tech.name}</span>
        <div className={styles.about__rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={i < tech.rating ? styles.dotFilled : styles.dotEmpty}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.about} id="about">
      <div className={styles.about__intro}>
        <h2 className={styles.about__title}>About me</h2>
        <p className={styles.about__text}> I&apos;m a Programming student at Artevelde University of Applied Sciences in Ghent. My main passion is back-end development, but I&apos;m also interested in full-stack work. Below, you can find all the technologies I&apos;m familiar with.</p>
      </div>

      <div className={styles.about__marqueeWrapper}>
        <div
          ref={marqueeRef}
          className={styles.about__marquee}
          onMouseEnter={() => animatePlaybackRate(0)}
          onMouseLeave={() => animatePlaybackRate(1)}
        >
          {techStack.map((tech) => renderCard(tech, tech.name))}
          {techStack.map((tech) => renderCard(tech, `${tech.name}-2`))}
        </div>
      </div>
    </section>
  );
}
