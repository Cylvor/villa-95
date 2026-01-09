const amenities = [
  "Private pool",
  "Air conditioning",
  "Fast Wi‑Fi",
  "Full kitchen",
  "Outdoor dining",
  "Sun loungers",
  "Parking",
  "Washer",
  "Smart TV",
];

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="border-y border-black/5 bg-zinc-50/60 py-16 dark:border-white/10 dark:bg-white/5 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
              Amenities
            </h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Everything you need for a comfortable stay.
            </p>
          </div>
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-black hover:bg-zinc-50 dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
          >
            See full listing
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div
              key={a}
              className="rounded-2xl border border-black/5 bg-white p-4 text-sm text-zinc-800 dark:border-white/10 dark:bg-black/30 dark:text-zinc-200"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
