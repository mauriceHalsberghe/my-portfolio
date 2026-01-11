"use client";

import { useEffect, useState } from "react";

import{ MoonIcon } from "./icons/MoonIcon";
import{ SunIcon } from "./icons/SunIcon";

import styles from '../ui/toggle.module.css';


export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      style={{
        position: "fixed",
        right: "2rem",
        top: '3.4rem',
        zIndex: 1000,
        cursor: 'pointer',
      }}

    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
