import styles from "@/components/pages/projects/projects.module.css";
import Link from "next/link";

import { getProjects } from "@/lib/projects";
import ScrollToTop from "@/components/ui/scroll-to-top/ScrollToTop";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import ProjectsFilter from "@/components/pages/projects/ProjectsFilter";

export default async function ProjectPage() {
  const projects = await getProjects();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <section className={styles.projects} id="projects">
        <h2 className={styles.projects__title2}>My Projects</h2>

        <p className={styles.projects__content}>
          A collection of my recent projects built with different sorts of web technologies. 
        </p>

        <ProjectsFilter projects={projects} />

      </section>

      <div className={styles.footer}>
        <p className={styles.footer__first}>Interested in even more?</p>
        <p className={styles.footer__second}>Check out my <Link href={"https://github.com/mauriceHalsberghe"} target="_blank">GitHub</Link>!</p>
      </div>

      <Footer />
    </>
  );
}
