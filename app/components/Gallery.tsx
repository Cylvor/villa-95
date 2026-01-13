const tiles = [
  { title: "Pool deck", note: "Sunset-ready" },
  { title: "Living room", note: "Open & bright" },
  { title: "Primary bedroom", note: "Quiet nights" },
  { title: "Kitchen", note: "Cook-friendly" },
  { title: "Outdoor dining", note: "Long dinners" },
  { title: "Garden", note: "Private" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Gallery
          </h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-forest-green/80">
            Add real photos later; these tiles are placeholders.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <div
            key={t.title}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-olive-green/20 bg-gradient-to-br from-olive-green/30 to-earthy-taupe/40"
          >
            <div className="absolute inset-x-0 bottom-0 bg-white/80 p-4 backdrop-blur">
              <p className="text-sm font-semibold text-forest-green">
                {t.title}
              </p>
              <p className="mt-1 text-xs text-warm-brown">
                {t.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
