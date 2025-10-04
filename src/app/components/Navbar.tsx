import Link from "next/link";
import styles from "../ui/navbar.module.css";


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__list}>
        <Link className={styles.navbar__link} href={'#'}>Home</Link>
        <Link className={styles.navbar__link} href={'#'}>About</Link>
        <Link className={styles.navbar__link} href={'#'}>Projects</Link>
        <Link className={styles.navbar__link} href={'#'}>Contact</Link>
      </div>
    </nav>

  );
}
