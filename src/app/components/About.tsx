import styles from "../ui/about.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.about__intro}>
        <h2 className={styles.about__title}>About me</h2>
        <p className={styles.about__text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, a sint! Magnam illum id ullam animi unde rem inventore cumque doloribus, delectus voluptatum deserunt quisquam quasi necessitatibus iure molestiae odio?</p>
      </div>
      <div className={styles.about__content}>

        <div className={styles.about__card}>
          <h3>JavaScript</h3>
        </div>

        <div className={styles.about__card}>
          <h3>Php</h3>
        </div>

        <div className={styles.about__card}>
          <h3>TypeScript</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>React</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>Python</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>HTML</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>Css</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>GitHub</h3>
        </div>
        
        <div className={styles.about__card}>
          <h3>Nextjs</h3>
        </div>

      </div>
    </section>
  );
}
