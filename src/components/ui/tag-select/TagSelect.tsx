"use client";

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from "./tag-select.module.css";

const options = [
  { value: 'aria', label: 'ARIA' },
  { value: 'craftcms', label: 'CraftCMS' },
  { value: 'csharp', label: 'C#' },
  { value: 'css', label: 'CSS' },
  { value: 'dotnet', label: '.NET' },
  { value: 'filament', label: 'Filament' },
  { value: 'html', label: 'HTML' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'php', label: 'PHP' },
  { value: 'prisma', label: 'Prisma' },
  { value: 'react', label: 'React' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'strapi', label: 'Strapi' },
  { value: 'vite', label: 'Vite' }
];

export type TagOption = { value: string; label: string };

interface TagSelectProps {
  onChange: (selected: readonly TagOption[]) => void;
}

export default function TagSelect({ onChange }: TagSelectProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={options}
      className={styles.select}
      placeholder="Select project tags..."
      onChange={(selected) => onChange(selected as readonly TagOption[])}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          boxShadow: "none",
          "&:hover": {
            border: "none",
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "none",
          borderRadius: "1rem"
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: "0.5rem",
          backgroundColor: "var(--bubble)",
          backdropFilter: "blur(5px)",
          border: "1px solid #ffffff4d",
          borderRadius: "1rem",
          boxShadow: "5px 0 10px #0003, inset 5px -5px 10px #0003",
          zIndex: "999"
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "var(--main-blue)",
          color: "white",
          borderRadius: "5rem",
          width: "auto",
          cursor: "pointer",
          padding: "2px 12px",
          boxShadow: "0 0 10px #0003",
          transition: "background 200ms ease",
          "&:hover": {
            backgroundColor: "var(--main-blue-tr)",
          },
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "var(--main-blue)",
          borderRadius: "5rem",
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: "white",
          "&:hover": {
            borderRadius: "5rem",
            cursor: "pointer"
          },
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
}