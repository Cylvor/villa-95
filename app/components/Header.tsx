export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest-green/10 bg-mist-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="text-sm font-semibold tracking-tight text-forest-green">
          Villa 95
        </a>

        <nav className="hidden items-center gap-6 text-sm text-warm-brown md:flex">
          <a href="#about" className="hover:text-forest-green transition-colors">
            About
          </a>
          <a
            href="#amenities"
            className="hover:text-forest-green transition-colors"
          >
            Amenities
          </a>
          <a
            href="#gallery"
            className="hover:text-forest-green transition-colors"
          >
            Gallery
          </a>
          <a
            href="#location"
            className="hover:text-forest-green transition-colors"
          >
            Location
          </a>
        </nav>

        <a
          href="https://www.booking.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-full bg-sunlit-amber px-4 text-sm font-medium text-white hover:bg-sunlit-amber/90 transition-colors"
        >
          Book on Booking.com
        </a>
      </div>
    </header>
  );
}
