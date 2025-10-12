import styles from "../ui/contact.module.css";
import Link from "next/link";

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
        <div className={styles.contact__content}>
            <h2 className={styles.contact__title}>Contact</h2>
            
            <div className={styles.contact__links}>
                <p className={styles.contact__link}>
                <Link href="https://github.com/mauriceHalsberghe" target="_blank" rel="noopener noreferrer">
                    GitHub
                </Link>
                </p>
                <p className={styles.contact__link}>
                <Link href="https://www.linkedin.com/in/maurice-halsberghe/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </Link>
                </p>
                <p className={styles.contact__link}>
                <Link href="mailto:maurice.halsberghe@student.arteveldehs.be">
                    Email
                </Link>
                </p>
            </div>
        </div>

      <p className={styles.contact__footer}>
        © {new Date().getFullYear()} Maurice Halsberghe
      </p>
    </section>
  );
}
