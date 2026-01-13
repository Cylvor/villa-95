export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-green/60 via-forest-green/40 to-forest-green/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-mist-cream/90 drop-shadow-lg">
            Private villa escape
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            Modern, calm, and minutes from everything.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist-cream/95 drop-shadow-lg">
            Villa 95 is designed for slow mornings, sunset swims, and effortless
            comfort. Nestled in the heart of nature, experience tranquility like never before.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#gallery"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              View photos
            </a>
            <a
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-sunlit-amber px-6 text-sm font-semibold text-white shadow-xl hover:bg-sunlit-amber/90 hover:shadow-2xl transition-all"
            >
              Check availability
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md max-w-md">
            <div className="text-center">
              <dt className="text-xs font-medium text-mist-cream/80">Guests</dt>
              <dd className="mt-1.5 text-2xl font-bold text-white drop-shadow-lg">
                6–8
              </dd>
            </div>
            <div className="text-center">
              <dt className="text-xs font-medium text-mist-cream/80">Bedrooms</dt>
              <dd className="mt-1.5 text-2xl font-bold text-white drop-shadow-lg">
                3
              </dd>
            </div>
            <div className="text-center">
              <dt className="text-xs font-medium text-mist-cream/80">Pool</dt>
              <dd className="mt-1.5 text-2xl font-bold text-white drop-shadow-lg">
                Yes
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="h-6 w-6"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
