"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ModeToggle from "../mode-toggle/ModeToggle";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const sections = ["hero", "about", "projects", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("start");
  const [easterEgg, setEasterEgg] = useState(false);
  const [width, setWidth] = useState(0);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const update = () => {
      setWidth(window.innerWidth);
      setShowNav(window.innerWidth > 480);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  function toggleNav() {
    setShowNav((prev) => !prev);
  }

  return (
    <div>

      <nav className={styles.buttons} >
        <Link href={'https://github.com/mauriceHalsberghe'} target="_blank" className={styles.gitHubIcon}>
          <FontAwesomeIcon icon={faGithub} />
        </Link>

        <ModeToggle />

        { width < 481 && (
          <button type="button" style={{cursor: "pointer"}} onClick={toggleNav}>
            
            { showNav ? 
              <FontAwesomeIcon icon={faXmark} /> :
              <FontAwesomeIcon icon={faBars} />
            }            
          </button>
        )}
      </nav>



    { showNav && (
      <nav className={styles.navbar}>

        <div className={styles.navbar__list}>

          {easterEgg ? (
            <Link className={styles.navbar__link} href={'/admin'}>Exit the matrix</Link>
          ) : (
            <>
              {sections.map((id) => (
                <Link
                  key={id}
                  href={`/#${id}`}
                  onClick={() => setShowNav(false)}
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
    )}

    </div>
  );
}
