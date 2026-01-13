export default function Footer() {
  return (
    <footer className="border-t border-olive-green/10 bg-earthy-taupe/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-forest-green">
            Villa 95
          </p>
          <p className="mt-1 text-sm text-warm-brown">
            A simple villa landing page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-brown">
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
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest-green"
          >
            Booking.com
          </a>
        </div>

        <p className="text-xs text-warm-brown/70">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
