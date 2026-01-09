export default function Location() {
  return (
    <section
      id="location"
      className="border-t border-black/5 py-16 dark:border-white/10 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
            Location
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Keep this section aligned with the Booking.com listing details. Add
            exact neighborhood, drive times, and nearby highlights.
          </p>

          <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-sm dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold text-black dark:text-white">
              Nearby highlights
            </p>
            <ul className="mt-3 space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>• Beaches and coastal walks</li>
              <li>• Cafes, restaurants, markets</li>
              <li>• Day trips and viewpoints</li>
            </ul>
          </div>

          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Open Booking.com
          </a>
        </div>

        <div className="rounded-3xl border border-black/5 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="aspect-[16/10] w-full rounded-2xl border border-black/5 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950" />
          <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
            Replace this block with a map embed later (Google Maps / Mapbox).
          </p>
        </div>
      </div>
    </section>
  );
}
