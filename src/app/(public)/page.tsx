import About from "@/components/pages/about/About";
import Contact from "@/components/pages/contact/Contact";
import Footer from "@/components/ui/footer/Footer";
import Hero from "@/components/pages/hero/Hero";
import Navbar from "@/components/ui/navbar/Navbar";
import Projects from "@/components/pages/projects/Projects";


export default async function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
