import projects from "../../data/projects.json";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/project.module.css"

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
            <p>{project.description[0]}</p>
          </div>
          <Image className={styles.project__image} src={project.banner_img} width={600} height={0} alt={project.name} />
        </div>
      </section>
    </>
  );
}
