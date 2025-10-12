import projects from "../../data/projects.json";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/project.module.css"
import delay from "delay";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return (

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>
          Project not found
        </h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/#hero">Go Back</Link>
        </div>
    )
  }

  return (
    <>
      <Navbar />
      <section className={styles.project}>
        <div className={styles.project__intro}>
          <div>
            <h1 className={styles.project__title}>{project.name}</h1>
            <p className={styles.project__description}>{project.description[0]}</p>

            <ul className={styles.project__tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className={styles.project__links}>
              { project.github_link &&
                <a className={styles.project__link} href={project.github_link} target="_blank">GitHub</a>
              }
              { project.project_link &&
                <a className={styles.project__link} href={project.project_link} target="_blank">Website</a>
              }
            </div>

          </div>
          <Image className={styles.project__image} src={"/images/" + project.banner_img} width={1400} height={0} alt={project.name} />
        </div>
        <div className={styles.project__content1}>
          <div className={styles.project_images}>
            <Image className={styles.project__image} src={"/images/" + project.images[0]} width={600} height={0} alt={project.name} />
            <Image className={styles.project__image} src={"/images/" + project.images[1]} width={600} height={0} alt={project.name} />
          </div>
          <p className={styles.project__description}>{project.description[1]}</p>
        </div>
        { project.description[2] &&
          <div className={styles.project__content2}>
            <div className={styles.project_images}>
              <Image className={styles.project__image} src={"/images/" + project.images[2]} width={600} height={0} alt={project.name} />
              <Image className={styles.project__image} src={"/images/" + project.images[3]} width={600} height={0} alt={project.name} />
            </div>
            <p className={styles.project__description}>{project.description[2]}</p>
          </div>
        }
        { project.description[3] &&
                  <div className={styles.project__content3}>
          <p className={styles.project__description}>{project.description[3]}</p>
          <div className={styles.project_images}>
            <Image className={styles.project__image} src={"/images/" + project.images[4]} width={600} height={0} alt={project.name} />
            <Image className={styles.project__image} src={"/images/" + project.images[5]} width={600} height={0} alt={project.name} />
          </div>
        </div>
        }
      </section>
    </>
  );
}
