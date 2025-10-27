import styles from '../ui/footer.module.css';

export default function Footer() {
    return (
        <p className={styles.footer}>
        © {new Date().getFullYear()} Maurice Halsberghe
      </p>
    )
}