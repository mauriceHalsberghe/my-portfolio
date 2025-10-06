"use client"; 
 
import Link from "next/link"; 
import { useEffect, useState } from "react"; 
import styles from "../ui/hero.module.css"; 
import Image from "next/image"; 
 
export default function Hero() { 
  const titles = [ 
    "Full-Stack Developer", 
    "JavaScript Enthusiast", 
    "Student at Artevelde University", 
    "Open Source Contributor", 
    "UI/UX Explorer", 
  ]; 
 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [fadeOpacity, setFadeOpacity] = useState(1); 
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [parallaxOffset, setParallaxOffset] = useState(0); 
 
  useEffect(() => { 
    const handleScroll = () => { 
      const scrollY = window.scrollY; 
      const factor = Math.min(scrollY / 600, 1); 
      setScrollOpacity(1 - factor);
      
      setParallaxOffset(scrollY * 0.5);
    }; 
 
    window.addEventListener("scroll", handleScroll, { passive: true }); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []); 
 
  useEffect(() => { 
    const interval = setInterval(() => { 
      setFadeOpacity(0); 
 
      setTimeout(() => { 
        setCurrentIndex((prev) => (prev + 1) % titles.length); 
        setFadeOpacity(1); 
      }, 300); 
    }, 3000); 
 
    return () => clearInterval(interval); 
  }, [titles.length]); 
 
  return ( 
    <section className={styles.hero} id="hero"> 
      <div 
        style={{ 
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      >
        <h1 className={styles.hero__title}> 
          <Image 
            width={100} 
            height={100} 
            src="svg/name.svg" 
            alt="Maurice Halsberghe" 
            className={styles.hero__image} 
            style={{ 
              opacity: scrollOpacity + 0.15, 
              transition: "opacity 0.2s", 
            }} 
          /> 
        </h1> 
 
        <p 
          className={styles.hero__subtitle} 
          style={{ 
            opacity: fadeOpacity * scrollOpacity + 0.1, 
            transition: "opacity 0.3s", 
          }} 
        > 
          {titles[currentIndex]} 
        </p> 
 
        <Link 
          href="#about" 
          className={styles.scrollDown} 
          style={{ opacity: scrollOpacity * 0.5, transition: "opacity 0.3s" }} 
        > 
          <div className={styles.arrow} /> 
        </Link> 
      </div>
    </section> 
  ); 
}