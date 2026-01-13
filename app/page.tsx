import About from "./components/About";
import Amenities from "./components/Amenities";
import CustomCursor from "./components/CustomCursor";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HouseRules from "./components/HouseRules";
import Location from "./components/Location";
import ScrollingText from "./components/ScrollingText";
import SectionReveal from "./components/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-mist-cream text-forest-green">
      <CustomCursor />
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
        <SectionReveal>
          <HouseRules />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
