"use client";

const items = [
  "Create Trips Instantly",
  "Flexible Booking",
  "Smart Route Management",
  "Secure Payments",
  "Analytics & Insights",
  "Flexible Commission",
];

export default function Benefits() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-white/5 p-6 bg-bgSoft"
          >
            <h4 className="font-semibold text-primary">{item}</h4>
            <p className="mt-2 text-sm text-gray-400">
              Designed to scale effortlessly for both individuals and fleets.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
