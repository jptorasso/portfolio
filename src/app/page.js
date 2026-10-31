import About from "@/components/sections/About/About";
import Contact from "@/components/sections/Contact/Contact";
import Hero from "@/components/sections/Hero/Hero";
import Projects from "@/components/sections/Projects/Projects";
import Technologies from "@/components/sections/Technologies/Technologies";
import Timeline from "@/components/sections/Timeline/Timeline";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Timeline />
      <Contact />
    </>
  );
}
