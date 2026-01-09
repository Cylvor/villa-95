export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-black dark:text-white">
            Villa 95
          </p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            A simple villa landing page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
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
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black dark:text-white"
          >
            Booking.com
          </a>
        </div>

        <p className="text-xs text-zinc-500">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
