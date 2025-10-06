"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui/navbar.module.css";

export default function Navbar() {
  const sections = ["hero", "about", "projects", "contact"];
  const [activeSection, setActiveSection] = useState("start");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__list}>
        {sections.map((id) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`${styles.navbar__link} ${
              activeSection === id ? styles.active : ""
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
