'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './projects.module.css';

export default function AllProjectsLink() {
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    iconRef.current?.classList.add(styles.animating);
  };

  const handleMouseLeave = () => {
    const span = iconRef.current;
    if (!span) return;
    const svg = span.querySelector('svg');
    if (!svg) return;
    svg.addEventListener(
      'animationiteration',
      () => span.classList.remove(styles.animating),
      { once: true }
    );
  };

  return (
    <Link
      href="/projects"
      className={styles.allProjects}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      All Projects
      <span ref={iconRef}>
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </Link>
  );
}
