import styles from "../ui/projects.module.css";
import Image from "next/image";
import Link from "next/link";
import projects from "../data/projects.json";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.projects__title}>Projects</h2>

      <p className={styles.projects__content}>
        A collection of my recent projects built with different sorts of web technologies. 
      </p>

      <div className={styles.projects__cards}>
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className={styles.projects__card}>
            <Image className={styles.projects__image} src={"/images/" + project.banner_img} width={450} height={250} alt={project.name} />
            <h3 className={styles.projects__name}>{project.name}</h3>
            <ul className={styles.projects__tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
