"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TagSelect, { TagOption } from "@/components/ui/tag-select/TagSelect";
import styles from "@/components/pages/projects/projects.module.css";

type Project = {
  id: number;
  order: number;
  name: string;
  tags: string[];
  banner_img: string;
};

interface ProjectsFilterProps {
  projects: Project[];
}

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

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [selectedTags, setSelectedTags] = useState<readonly TagOption[]>([]);

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  const filtered =
    selectedTags.length === 0
      ? sorted
      : sorted.filter((project) =>
          selectedTags.some((tag) =>
            project.tags.some(
              (t) => t.toLowerCase() === tag.label.toLowerCase()
            )
          )
        );

  return (
    <>
      <TagSelect onChange={setSelectedTags} />

      <div className={styles.projects__cards}>
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={styles.projects__card}
          >
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
    </>
  );
}
