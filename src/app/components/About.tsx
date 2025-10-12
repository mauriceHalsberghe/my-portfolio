"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../ui/about.module.css";

interface Tech {
  name: string;
  src: string;
  info: string;
}

export default function About() {
  const techStack: Tech[] = [
    { name: "JavaScript", src: "svg/javascript.svg", info: "A versatile language used for interactive web development." },
    { name: "PHP", src: "svg/php.svg", info: "A server-side scripting language for building dynamic websites." },
    { name: "TypeScript", src: "svg/typescript.svg", info: "A superset of JavaScript that adds static typing and better tooling." },
    { name: "React", src: "svg/react.svg", info: "A library for building fast, modular, and reusable user interfaces." },
    { name: "Python", src: "svg/python.svg", info: "A popular high-level language known for simplicity and AI/ML support." },
    { name: "HTML", src: "svg/html.svg", info: "The markup language that structures content on the web." },
    { name: "CSS", src: "svg/css.svg", info: "Used to style and layout web pages with colors, fonts, and animations." },
    { name: "Git", src: "svg/git.svg", info: "A version control system for tracking changes in code collaboratively." },
  ];

  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);

  const handleTechClick = (tech: Tech) => {
    // if clicked tech is already selected, deselect it
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
              <Image
                alt={tech.name}
                className={styles.about__image}
                width={100}
                height={100}
                src={tech.src}
              />
            </div>
          ))}
        </div>

        <div className={styles.about__tooltip}>
          <h3>{selectedTech ? selectedTech.name : "Select a technology"}</h3>
          <p>{selectedTech ? selectedTech.info : "Click on a technology to see more info"}</p>
        </div>
      </div>
    </section>
  );
}
