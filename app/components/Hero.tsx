export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-950 dark:to-black" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            Private villa escape
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Modern, calm, and minutes from everything.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Villa 95 is designed for slow mornings, sunset swims, and effortless
            comfort. Explore the spaces, amenities, and location—then book via
            Booking.com.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#gallery"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-zinc-50 dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
            >
              View photos
            </a>
            <a
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Check availability
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-black/5 bg-white/70 p-4 text-center backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div>
              <dt className="text-xs text-zinc-600 dark:text-zinc-400">Guests</dt>
              <dd className="mt-1 text-sm font-semibold text-black dark:text-white">
                6–8
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-600 dark:text-zinc-400">Bedrooms</dt>
              <dd className="mt-1 text-sm font-semibold text-black dark:text-white">
                3
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-600 dark:text-zinc-400">Pool</dt>
              <dd className="mt-1 text-sm font-semibold text-black dark:text-white">
                Yes
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-zinc-200 to-zinc-50 shadow-sm dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-36 w-36 rounded-3xl border border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-white/5 md:block" />
          <div className="pointer-events-none absolute -top-6 -right-6 hidden h-28 w-40 rounded-3xl border border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5 md:block" />
          <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
            Replace this image block with real villa photos later.
          </p>
        </div>
      </div>
    </section>
  );
}
