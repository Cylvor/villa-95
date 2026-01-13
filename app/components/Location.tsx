export default function Location() {
  const mapQuery = "Villa 95   Rangala, Kandy, Sri Lanka";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&z=14&output=embed`;

  return (
    <section
      id="location"
      className="border-t border-olive-green/10 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-8xl gap-10 px-6 sm:px-8 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Location
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            Villa 95 Rangala is perfectly situated in Kandy, offering easy access to 
            popular attractions while maintaining a peaceful retreat atmosphere. Couples 
            particularly love the location—rating it 10/10 for a two-person trip.
          </p>

          <div className="mt-6 rounded-2xl border border-olive-green/20 bg-white p-5 text-sm">
            <p className="font-semibold text-forest-green">
              Nearby Attractions
            </p>
            <ul className="mt-3 space-y-2 text-forest-green/80">
              <li>• Victoria Reservoir Kandy Seaplane Base - 9.9 mi</li>
              <li>• Pallekele International Cricket Stadium - 8.1 mi</li>
              <li>• Sri Dalada Maligawa (Temple of the Tooth) - 17 mi</li>
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-olive-green/20 bg-white p-5 text-sm">
            <p className="font-semibold text-forest-green">
              Activities
            </p>
            <ul className="mt-3 space-y-2 text-forest-green/80">
              <li>• Walking tours</li>
              <li>• Hiking trails</li>
              <li>• Cultural site visits</li>
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
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-sky-blue/30 bg-white">
            <iframe
              title="Villa 95 location map"
              src={mapSrc}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-warm-brown">{mapQuery}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-forest-green underline underline-offset-4 hover:text-forest-green/80"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
