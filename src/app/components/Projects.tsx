import styles from "../ui/projects.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.projects__title}>Projects</h2>
      <p className={styles.projects__content}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, amet
        iste. Reiciendis iste adipisci quos corporis explicabo accusantium
        laudantium illo pariatur voluptatem accusamus porro labore perspiciatis
        in, magnam animi deserunt?
      </p>

      <div className={styles.projects__cards}>

        <Link href='/projects/1' className={styles.projects__card}>
          <h3>Boudewijn Filterapp</h3>
          <Image className={styles.projects__image} src="/images/boudewijn_1.png" width={400} height={0} alt="Boudewijn Filterapp" />
        </Link>

        <Link href='/projects/1' className={styles.projects__card}>
          <h3>Boudewijn Filterapp</h3>
          <Image className={styles.projects__image} src="/images/boudewijn_1.png" width={400} height={0} alt="Boudewijn Filterapp" />
        </Link>

        <Link href='/projects/1' className={styles.projects__card}>
          <h3>Boudewijn Filterapp</h3>
          <Image className={styles.projects__image} src="/images/boudewijn_1.png" width={400} height={0} alt="Boudewijn Filterapp" />
        </Link>
        
      </div>
    </section>
  );
}
