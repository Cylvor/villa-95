const destinations = [
  {
    name: "Knuckles Five Peak Mountains",
    description: "Iconic mountain range with breathtaking peaks and hiking trails",
    image: "/5 peak.jpg",
    category: "Mountain"
  },
  {
    name: "Rangala Natural Pool",
    description: "Crystal-clear natural pool surrounded by lush greenery",
    image: "/rangala natural pool.jpg",
    category: "Water"
  },
  {
    name: "Thunhisgala Mountain",
    description: "Majestic mountain peak with panoramic views",
    image: "/thunhisgala.jpg",
    category: "Mountain"
  },
  {
    name: "Meemure Village",
    description: "Traditional village nestled in the Knuckles range",
    image: "/meemure.jpeg",
    category: "Village"
  },
  {
    name: "Jodu Falls",
    description: "Hidden waterfall paradise for nature lovers",
    image: "/jodu falls.jpeg",
    category: "Waterfall"
  },
  {
    name: "Saaree Falls",
    description: "Serene waterfall with pristine swimming spots",
    image: "/saaree falls.jpeg",
    category: "Waterfall"
  },
  {
    name: "Huluganga Falls",
    description: "Powerful cascading waterfall in a scenic gorge",
    image: "/huluganga falls.jpg.jpeg",
    category: "Waterfall"
  },
  {
    name: "Heeloya Village",
    description: "Charming village with authentic rural experience",
    image: "/heeloya.jpg",
    category: "Village"
  },
  {
    name: "Corbet's Gap",
    description: "Scenic mountain pass with stunning valley views",
    image: "/corbets gap.jpeg",
    category: "Mountain"
  },
];

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="border-t border-olive-green/10 bg-mist-cream py-16 md:py-20"
    >
      <div className="mx-auto max-w-8xl px-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Nearby Destinations
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base leading-7 text-forest-green/80">
            Discover the natural wonders and cultural treasures surrounding Villa 95 Rangala. 
            From majestic waterfalls to historic villages, adventure awaits at every turn.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="group relative overflow-hidden rounded-2xl border border-olive-green/20 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-olive-green/20 to-sky-blue/20">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-forest-green leading-tight">
                    {destination.name}
                  </h3>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-olive-green/10 px-2 py-1 text-xs font-medium text-forest-green">
                    {destination.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-forest-green/70">
                  {destination.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-forest-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
