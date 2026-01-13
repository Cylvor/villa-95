const highlights = [
  {
    title: "Spacious Family Rooms",
    description:
      "Private bathrooms, balconies, and stunning garden or mountain views in every room.",
  },
  {
    title: "Fully Equipped Kitchen",
    description:
      "Complete kitchen facilities with washing machine, fast Wi-Fi, and all modern conveniences.",
  },
  {
    title: "Dining & Leisure",
    description:
      "Family-friendly restaurant with Chinese, British, Indian & seafood cuisines, plus a relaxing bar.",
  },
  {
    title: "Perfect Location",
    description:
      "Loved by couples—rated 10/10 for location. Close to hiking trails and walking tours.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-8xl px-6 sm:px-8 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Villa 95 Rangala in Kandy
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            Experience spacious accommodations in the heart of Kandy. Villa 95 Rangala offers 
            spacious family rooms with private bathrooms, balconies, and breathtaking garden or 
            mountain views. Each room is thoughtfully equipped with a full kitchen, washing machine, 
            and complimentary high-speed Wi-Fi.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-forest-green/80">
            Enjoy our family-friendly restaurant serving delicious Chinese, British, Indian, and 
            seafood cuisines. Relax at our bar, or dine al fresco on the terrace surrounded by our 
            beautiful garden. With 24-hour front desk, free parking, and full-day security, your 
            comfort and safety are our priority.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
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
