import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
