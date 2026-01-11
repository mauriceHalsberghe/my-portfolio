"use client";
import { ComponentType, useState } from "react";
import styles from "../ui/about.module.css";

import { JavaScriptIcon } from "../components/icons/JavaScriptIcon";
import { PHPIcon } from "../components/icons/PHPIcon";
import { TypeScriptIcon } from "../components/icons/TypeScriptIcon";
import { ReactIcon } from "../components/icons/ReactIcon";
import { PythonIcon } from "../components/icons/PythonIcon";
import { HTMLIcon } from "../components/icons/HTMLIcon";
import { CSSIcon } from "../components/icons/CSSIcon";
import { GitIcon } from "../components/icons/GitIcon";


interface Tech {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  info: string;
  rating: number;
}

export default function About() {
  const techStack: Tech[] = [
    { name: "JavaScript", Icon: JavaScriptIcon, info: "A versatile language used for interactive web development.", rating: 5, },
    { name: "PHP", Icon: PHPIcon, info: "A server-side scripting language for building dynamic websites.", rating: 4 },
    { name: "TypeScript", Icon: TypeScriptIcon, info: "A superset of JavaScript that adds static typing and better tooling.", rating: 4, },
    { name: "React", Icon: ReactIcon, info: "A library for building fast, modular, and reusable user interfaces.", rating: 4, },
    { name: "Python", Icon: PythonIcon, info: "A popular high-level language known for simplicity and AI/ML support.", rating: 3, },
    { name: "HTML", Icon: HTMLIcon, info: "The markup language that structures content on the web.", rating: 5, },
    { name: "CSS", Icon: CSSIcon, info: "Used to style and layout web pages with colors, fonts, and animations.", rating: 4, },
    { name: "Git", Icon: GitIcon, info: "A version control system for tracking changes in code collaboratively.", rating: 4, },
  ];  

  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);

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
                <div key={i} className={ i < selectedTech.rating ? styles.starFilled : styles.starEmpty }></div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
