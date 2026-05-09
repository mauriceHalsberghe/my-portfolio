import projects from "@/data/projects.json";


import Link from "next/link";
import styles from "@/components/pages/projects/project.module.css"
import Footer from "@/components/ui/footer/Footer";
import Navbar from "@/components/ui/navbar/Navbar";
import ImageWithPreview from "@/components/ui/image-preview/ImagePreview";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Project not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/#hero">Go Back</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.project}>
        <div className={styles.project__intro}>
          <div className={styles.project__info}>
            <h1 className={styles.project__title}>{project.name}</h1>
            <p className={styles.project__description}>
              {project.description[0]}
            </p>

            <ul className={styles.project__tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className={styles.project__links}>
              {project.github_link && (
                <a
                  className={styles.project__link}
                  href={project.github_link}
                  target="_blank"
                >
                  GitHub
                </a>
              )}
              {project.project_link && (
                <a
                  className={styles.project__link}
                  href={project.project_link}
                  target="_blank"
                >
                  Website
                </a>
              )}
            </div>
          </div>
          <ImageWithPreview
            className={styles.project__image}
            src={"/images/" + project.banner_img}
            alt={project.name}
            images={[
              "/images/" + project.banner_img,
              ...project.images.map((i) => "/images/" + i),
            ]}
            index={0}
            width={600}
            height={400}
          />
        </div>
        <div className={styles.project__content1}>
          <div className={styles.project_images}>
            <ImageWithPreview
              className={styles.project__image}
              src={"/images/" + project.images[0]}
              width={600}
              height={400}
              alt={project.name}
              images={[
                "/images/" + project.banner_img,
                ...project.images.map((i) => "/images/" + i),
              ]}
              index={1}
            />
            <ImageWithPreview
              className={styles.project__image}
              src={"/images/" + project.images[1]}
              width={600}
              height={400}
              alt={project.name}
              images={[
                "/images/" + project.banner_img,
                ...project.images.map((i) => "/images/" + i),
              ]}
              index={2}
            />
          </div>
          <p className={styles.project__description}>
            {project.description[1]}
          </p>
        </div>
        {project.description[2] && (
          <div className={styles.project__content2}>
            <div className={styles.project_images}>
              <ImageWithPreview
                className={styles.project__image}
                src={"/images/" + project.images[2]}
                width={600}
                height={400}
                alt={project.name}
                images={[
                  "/images/" + project.banner_img,
                  ...project.images.map((i) => "/images/" + i),
                ]}
                index={3}
              />
              <ImageWithPreview
                className={styles.project__image}
                src={"/images/" + project.images[3]}
                width={600}
                height={400}
                alt={project.name}
                images={[
                  "/images/" + project.banner_img,
                  ...project.images.map((i) => "/images/" + i),
                ]}
                index={4}
              />
            </div>
            <p className={styles.project__description}>
              {project.description[2]}
            </p>
          </div>
        )}
        {project.description[3] && (
          <div className={styles.project__content3}>
            <p className={styles.project__description}>
              {project.description[3]}
            </p>
            <div className={styles.project_images}>
              <ImageWithPreview
                className={styles.project__image}
                src={"/images/" + project.images[4]}
                width={600}
                height={400}
                alt={project.name}
                images={[
                  "/images/" + project.banner_img,
                  ...project.images.map((i) => "/images/" + i),
                ]}
                index={5}
              />
              <ImageWithPreview
                className={styles.project__image}
                src={"/images/" + project.images[5]}
                width={600}
                height={400}
                alt={project.name}
                images={[
                  "/images/" + project.banner_img,
                  ...project.images.map((i) => "/images/" + i),
                ]}
                index={6}
              />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
