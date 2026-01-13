const rules = [
  {
    title: "Check-in",
    icon: "→",
    details: [
      { label: "Time", value: "10:00 AM to 6:00 PM" },
      { label: "Note", value: "Please let us know your arrival time in advance" }
    ]
  },
  {
    title: "Check-out",
    icon: "←",
    details: [
      { label: "Time", value: "8:00 AM to 11:00 AM" }
    ]
  },
  {
    title: "Cancellation & Prepayment",
    icon: "⚠",
    details: [
      { label: "Policy", value: "Varies according to accommodation type" },
      { label: "Check", value: "Enter stay dates to see conditions for your selected option" }
    ]
  },
  {
    title: "Children & Beds",
    icon: "👶",
    details: [
      { label: "Children", value: "All ages welcome" },
      { label: "Age restriction", value: "None for check-in" },
      { label: "Cribs & Extra beds", value: "Not available at this property" },
      { label: "Tip", value: "Add number and ages of children when searching for accurate pricing" }
    ]
  },
  {
    title: "Pets",
    icon: "🐾",
    details: [
      { label: "Policy", value: "Pets are not allowed" }
    ]
  }
];

export default function HouseRules() {
  return (
    <section
      id="house-rules"
      className="border-t border-olive-green/10 bg-earthy-taupe/10 py-16 md:py-20"
    >
      <div className="mx-auto max-w-8xl px-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-green sm:text-3xl">
            House Rules
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base leading-7 text-forest-green/80">
            Villa 95 Rangala takes special requests. Please review our policies before booking.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-2xl border border-olive-green/20 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{rule.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-forest-green">
                    {rule.title}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {rule.details.map((detail, idx) => (
                      <div key={idx}>
                        <p className="text-xs font-medium text-forest-green/60 uppercase tracking-wide">
                          {detail.label}
                        </p>
                        <p className="mt-1 text-sm text-forest-green/90 leading-relaxed">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-sunlit-amber/30 bg-sunlit-amber/5 p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <p className="text-sm font-medium text-forest-green">
                Important Information
              </p>
              <p className="mt-2 text-sm text-forest-green/80 leading-relaxed">
                Cancellation and prepayment policies vary according to accommodation type. 
                Enter your stay dates and check the conditions of your selected option when booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
