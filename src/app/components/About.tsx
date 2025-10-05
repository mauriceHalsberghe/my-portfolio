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

  const [hoveredTech, setHoveredTech] = useState<Tech | null>(null);

  return (
    <section className={styles.about} id="about">
      <div className={styles.about__intro}>
        <h2 className={styles.about__title}>About me</h2>
        <p className={styles.about__text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum id ullam animi unde rem inventore cumque doloribus, delectus voluptatum deserunt quisquam quasi necessitatibus iure molestiae odio?
        </p>
      </div>

      <div className={styles.about__content}>
        <div className={styles.about__cards}>
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={styles.about__card}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
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
          <h3>{hoveredTech ? hoveredTech.name : "Hover"}</h3>
          <p>{hoveredTech ? hoveredTech.info : "over a technology to see more info"}</p>
        </div>
      </div>
    </section>
  );
}
