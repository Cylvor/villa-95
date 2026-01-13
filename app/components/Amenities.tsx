const amenities = [
  { label: "Free Wi-Fi", icon: "📶" },
  { label: "Family rooms", icon: "🛏️" },
  { label: "Free parking", icon: "🅿️" },
  { label: "Restaurant", icon: "🍽️" },
  { label: "Non-smoking rooms", icon: "🚭" },
  { label: "Room service", icon: "🛎️" },
  { label: "24-hour front desk", icon: "🕘" },
  { label: "Garden", icon: "🌿" },
  { label: "Bar", icon: "🍹" },
  { label: "Breakfast", icon: "🥐" },
  { label: "Waterpark", icon: "💦" },
  { label: "Private bathrooms", icon: "🚿" },
  { label: "Balconies", icon: "🌅" },
  { label: "Full kitchen", icon: "🍳" },
  { label: "Washing machine", icon: "🧺" },
  { label: "Terrace", icon: "🪴" },
  { label: "Outdoor dining", icon: "🌤️" },
  { label: "Bicycle parking", icon: "🚲" },
  { label: "Breakfast in room", icon: "🛌🍳" },
  { label: "Full-day security", icon: "🛡️" },
  { label: "Mountain views", icon: "🏔️" },
  { label: "Garden views", icon: "🌳" },
];

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="border-y border-olive-green/10 bg-earthy-taupe/20 py-16 md:py-20"
    >
      <div className="mx-auto max-w-8xl px-6 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            Amenities
          </h2>
          <p className="max-w-xl text-base leading-7 text-forest-green/80">
            Everything you need for a comfortable stay.
          </p>
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
              key={a.label}
              className="flex items-start gap-2 rounded-2xl border border-olive-green/20 bg-white p-4 text-sm text-forest-green"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {a.icon}
              </span>
              <span className="leading-6">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
