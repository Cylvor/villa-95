export default function ScrollingText() {
  return (
    <section className="overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Repeat the text multiple times for seamless loop */}
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="mx-6 text-sm font-bold tracking-widest text-forest-green md:text-base"
          >
            VILLA 95 RANGALA
          </span>
        ))}
      </div>
    </section>
  );
}
