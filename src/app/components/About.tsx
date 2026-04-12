"use client";
import { ComponentType, useEffect, useState } from "react";
import styles from "../ui/about.module.css";

import { JavaScriptIcon } from "../components/icons/JavaScriptIcon";
import { PHPIcon } from "../components/icons/PHPIcon";
import { TypeScriptIcon } from "../components/icons/TypeScriptIcon";
import { ReactIcon } from "../components/icons/ReactIcon";
import { PythonIcon } from "../components/icons/PythonIcon";
import { HTMLIcon } from "../components/icons/HTMLIcon";
import { CSSIcon } from "../components/icons/CSSIcon";
import { GitIcon } from "../components/icons/GitIcon";
import { CSharpIcon } from "../components/icons/CSharpIcon";

import { TechIcon } from "../components/icons/TechIcon";

interface Tech {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  info: string;
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
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data: { intro: string; tech: TechEntry[] }) => {
        setIntro(data.intro);
        setTechStack(
          data.tech.map((t) => ({ ...t, Icon: iconMap[t.name] ?? TechIcon }))
        );
      });
  }, []);

  const handleTechClick = (tech: Tech) => {
    setSelectedTech(selectedTech?.name === tech.name ? null : tech);
  };


  return (
    <section className={styles.about} id="about">
      <div className={styles.about__intro}>
        <h2 className={styles.about__title}>About me</h2>
        <p className={styles.about__text}>
          I’m a Programming student at Artevelde University of Applied Sciences in Ghent. My main passion is back-end development, but I’m also interested in full-stack work. Below, you can find all the technologies I’m familiar with.
        </p>
      </div>

      <div className={styles.about__content}>
        <div className={styles.about__cards}>
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`${styles.about__card} ${
                selectedTech?.name === tech.name ? styles.active : ""
              }`}
              onClick={() => handleTechClick(tech)}
            >
              <tech.Icon className={styles.about__image} />
            </div>
          ))}
        </div>

        <div className={styles.about__tooltip}>
          <h3>{selectedTech ? selectedTech.name : "Select a technology"}</h3>
          <p>{selectedTech ? selectedTech.info : "Click on a technology to see more info"}</p>
          <div className={styles.about__rating}>
            {selectedTech &&
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={i < selectedTech.rating ? styles.starFilled : styles.starEmpty} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}