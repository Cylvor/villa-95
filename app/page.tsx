import About from "./components/About";
import Amenities from "./components/Amenities";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Location from "./components/Location";
import SectionReveal from "./components/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main>
        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Amenities />
        </SectionReveal>
        <SectionReveal>
          <Gallery />
        </SectionReveal>
        <SectionReveal>
          <Location />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
