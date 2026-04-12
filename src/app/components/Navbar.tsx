"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../ui/navbar.module.css";

import DarkModeToggle from "./DarkModeToggle";
import { GitHubIcon } from "./icons/GitHubIcon";

export default function Navbar() {
  const sections = ["hero", "about", "projects", "contact"];
  const [activeSection, setActiveSection] = useState("start");

  const [easterEgg, setEasterEgg] = useState(false);


  useEffect(() => {
    function handleEasterEgg() {
      setEasterEgg(true);
      setTimeout(() => setEasterEgg(false), 3000);
    }

    window.addEventListener("easterEgg", handleEasterEgg);
    return () => window.removeEventListener("easterEgg", handleEasterEgg);
  }, []);

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
  }, [sections]);

  return (
    <>
    <Link href={'https://github.com/mauriceHalsberghe'} target="_blank">
      <GitHubIcon />
    </Link>

    <DarkModeToggle />
    <nav className={styles.navbar}>

      <div className={styles.navbar__list}>

        {easterEgg ? (
          <Link className={styles.navbar__link} href={'/admin'}>Enter the backrooms</Link>
        ) : (
          <>
            {sections.map((id) => (
              <Link
                key={id}
                href={`/#${id}`}
                className={`${styles.navbar__link} ${
                  activeSection === id ? styles.active : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </>
        )}

      </div>
    </nav>
    </>
  );
}
