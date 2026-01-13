export default function Location() {
  return (
    <section
      id="location"
      className="border-t border-olive-green/10 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-8xl gap-10 px-5 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Location
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            Keep this section aligned with the Booking.com listing details. Add
            exact neighborhood, drive times, and nearby highlights.
          </p>

          <div className="mt-6 rounded-2xl border border-olive-green/20 bg-white p-5 text-sm">
            <p className="font-semibold text-forest-green">
              Nearby highlights
            </p>
            <ul className="mt-3 space-y-2 text-forest-green/80">
              <li>• Beaches and coastal walks</li>
              <li>• Cafes, restaurants, markets</li>
              <li>• Day trips and viewpoints</li>
            </ul>
          </div>

          <a
            href="https://www.booking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-sunlit-amber px-5 text-sm font-medium text-white hover:bg-sunlit-amber/90 transition-colors"
          >
            Open Booking.com
          </a>
        </div>

        <div className="rounded-3xl border border-olive-green/20 bg-earthy-taupe/10 p-6">
          <div className="aspect-[16/10] w-full rounded-2xl border border-sky-blue/30 bg-gradient-to-br from-sky-blue/20 to-olive-green/20" />
          <p className="mt-4 text-xs text-warm-brown">
            Replace this block with a map embed later (Google Maps / Mapbox).
          </p>
        </div>
      </div>
    </section>
  );
}
