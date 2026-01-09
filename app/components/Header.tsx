export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="text-sm font-semibold tracking-tight">
          Villa 95
        </a>

        <nav className="hidden items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300 md:flex">
          <a href="#about" className="hover:text-black dark:hover:text-white">
            About
          </a>
          <a
            href="#amenities"
            className="hover:text-black dark:hover:text-white"
          >
            Amenities
          </a>
          <a
            href="#gallery"
            className="hover:text-black dark:hover:text-white"
          >
            Gallery
          </a>
          <a
            href="#location"
            className="hover:text-black dark:hover:text-white"
          >
            Location
          </a>
        </nav>

        <a
          href="https://www.booking.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Book on Booking.com
        </a>
      </div>
    </header>
  );
}
