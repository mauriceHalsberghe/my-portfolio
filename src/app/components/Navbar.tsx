import Link from "next/link";
import styles from "../ui/navbar.module.css";


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__list}>
        <Link className={styles.navbar__link} href={'#hero'}>Home</Link>
        <Link className={styles.navbar__link} href={'#about'}>About</Link>
        <Link className={styles.navbar__link} href={'#projects'}>Projects</Link>
        <Link className={styles.navbar__link} href={'#'}>Contact</Link>
      </div>
    </nav>

  );
}
