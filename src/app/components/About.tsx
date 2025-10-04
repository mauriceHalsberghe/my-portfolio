import styles from "../ui/about.module.css";

export default function About() {
  return (
    <div className={styles.about}>
        <h2 className={styles.about__title}>About me</h2>
        <p className={styles.about__content}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, a sint! Magnam illum id ullam animi unde rem inventore cumque doloribus, delectus voluptatum deserunt quisquam quasi necessitatibus iure molestiae odio?</p>
    </div>
  );
}
