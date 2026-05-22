"use client";

import styles from "./projects.module.css";
import Image from "next/image";
import Link from "next/link";

import projects from "@/data/projects.json";
import AllProjectsLink from "./AllProjectsLink";
import { useState } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);  

  return (
    <Image
      className={styles.projects__image}
      src={imgSrc}
      width={450}
      height={250}
      alt={alt}
      onError={() => setImgSrc("/images/placeholder.png")}
    />
  );
}

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.projects__title}>Projects</h2>

      <p className={styles.projects__content}>
        Some of my recent projects built with different sorts of web technologies.
      </p>

      <div className={styles.projects__cards}>
        {projects
          .sort((a, b) => a.order - b.order)
          .slice(0, 6)
          .map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className={styles.projects__card}>
              <ProjectImage
                src={"/images/" + (project.banner_img || "placeholder.png")}
                alt={project.name}
              />
              <h3 className={styles.projects__name}>{project.name}</h3>
              <ul className={styles.projects__tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Link>
          ))}
      </div>

      <div className={styles.seeMore}>
        <p>Wanna explore more?</p>
        <AllProjectsLink />
      </div>
    </section>
  );
}