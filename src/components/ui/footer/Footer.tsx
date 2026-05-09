import styles from './footer.module.css';

export default function Footer() {
    return (
        <p className={styles.footer}>
        © {new Date().getFullYear()} Maurice Halsberghe
      </p>
    )
}