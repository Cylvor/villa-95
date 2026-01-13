import About from "./components/About";
import Amenities from "./components/Amenities";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Location from "./components/Location";
import ScrollingText from "./components/ScrollingText";
import SectionReveal from "./components/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-mist-cream text-forest-green">
      <Header />
      <main>
        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionReveal>
          <About />
        </SectionReveal>
        <ScrollingText />
        <SectionReveal>
          <Amenities />
        </SectionReveal>
        <SectionReveal>
          <Gallery />
        </SectionReveal>
        <SectionReveal>
          <Destinations />
        </SectionReveal>
        <SectionReveal>
          <Location />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
