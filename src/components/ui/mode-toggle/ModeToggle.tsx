"use client";

import { useEffect, useState, useRef } from "react";

import styles from "./mode-toggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


export default function ModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const clickTimes = useRef<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      setIsDark(false);
    }
  }, []);

  function handleClick() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");

    const now = Date.now();
    clickTimes.current = [...clickTimes.current, now].filter(t => now - t < 1000);

    if (clickTimes.current.length >= 5) {
      window.dispatchEvent(new CustomEvent("easterEgg"));
      clickTimes.current = [];
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle dark/light mode"
      className={styles.modeToggle}
    >
      {isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} /> }
    </button>
  );
}
