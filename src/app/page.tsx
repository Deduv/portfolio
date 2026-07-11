import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { SaasShowcase } from "@/components/sections/SaasShowcase";
import { JavaEngineering } from "@/components/sections/JavaEngineering";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Education />
        <SaasShowcase />
        <JavaEngineering />
      </main>
      <Footer />
    </>
  );
}
