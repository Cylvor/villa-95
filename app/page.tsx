import About from "./components/About";
import Amenities from "./components/Amenities";
import Dining from "./components/dining";
import Rooms from "./components/rooms";
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
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RoomTypes from "./components/RoomTypes";

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
        <SectionReveal>
          <Rooms />
        </SectionReveal>
        <SectionReveal>
          <RoomTypes />
        </SectionReveal>
        <SectionReveal>
          <Dining />
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
          <Reviews />
        </SectionReveal>
        <SectionReveal>
          <FAQ />
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
