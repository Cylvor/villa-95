export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen -mt-16 flex items-center overflow-hidden hero-prata">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/rangala.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mx-auto w-full max-w-8xl px-5 py-20" aria-hidden="true" />

      {/* Large branded text in bottom-left */}
      <div className="absolute z-20 bottom-4 left-4 sm:bottom-6 sm:left-8 text-[14vw] sm:text-[10vw] leading-none font-black text-white uppercase hero-prata pointer-events-none">
        VILLA 95
      </div>
    </section>
  );
}
