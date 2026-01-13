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
      className="border-y border-olive-green/10 bg-earthy-taupe/20 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
              Amenities
            </h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-forest-green/80">
              Everything you need for a comfortable stay.
            </p>
          </div>
          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full border border-forest-green/20 bg-white px-4 text-sm font-medium text-forest-green hover:bg-olive-green/10 transition-colors"
          >
            See full listing
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div
              key={a}
              className="rounded-2xl border border-olive-green/20 bg-white p-4 text-sm text-forest-green"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
