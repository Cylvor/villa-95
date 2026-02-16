import About from "./components/About";
import Amenities from "./components/Amenities";
import Dining from "./components/dining";
import Rooms from "./components/rooms";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import GuestDiaries from "./components/GuestDiaries";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HouseRules from "./components/HouseRules";
import Location from "./components/Location";
import ScrollingText from "./components/ScrollingText";
import SectionReveal from "./components/SectionReveal";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import RoomTypes from "./components/RoomTypes";
import Bar from "./components/Bar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-mist-cream text-forest-green overflow-x-hidden md:overflow-x-visible">
      <Header />
      <main>
          <Hero />
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
          <Bar />
        </SectionReveal>
        <SectionReveal>
          <Amenities />
        </SectionReveal>
        <SectionReveal>
          <Gallery />
        </SectionReveal>
        <SectionReveal>
          <GuestDiaries />
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
      
      {/* --- WhatsApp Floating Icon --- */}
      <a 
        href="https://wa.me/94773864650" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] group"
      >
        <div className="relative">
          {/* Pulsing background */}
          <div className="absolute inset-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
          {/* Main button */}
          <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110">
            <Image
              src="/logo/whatsapp.png"
              alt="WhatsApp"
              width={44}
              height={44}
              className="h-11 w-11"
            />
          </div>
        </div>
      </a>
    </div>
  );
}
