"use client";

const stats = [
  ["Trips Completed", "125.0K+"],
  ["Active Passengers", "450.0K+"],
  ["Total Operators", "9K+"],
  ["Cities Covered", "0"],
];

export default function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-4 gap-8 text-center">
        {stats.map(([label, value]) => (
          <div key={label}>
            <p className="text-3xl font-bold text-primary">{value}</p>
            <p className="text-sm text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
