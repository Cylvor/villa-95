const highlights = [
  {
    title: "Designed for comfort",
    description:
      "Open-plan living, quiet bedrooms, and plenty of shade for long afternoons.",
  },
  {
    title: "Thoughtful details",
    description:
      "Fast Wi‑Fi, well-equipped kitchen, and spaces that feel easy to live in.",
  },
  {
    title: "Great base",
    description:
      "Be close to beaches, cafes, and day trips—without sacrificing privacy.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-8xl px-5 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            A villa that feels like a reset.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            Villa 95 is a modern retreat built for relaxed stays—whether you're
            traveling as a family, a small group of friends, or a couple who wants
            extra space.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            The goal is simple: clean lines, warm light, and a layout that makes
            time slow down.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-olive-green/20 bg-white p-5"
            >
              <h3 className="text-sm font-semibold text-forest-green">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-forest-green/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
