const stats = [
  { label: "Trips Completed", value: "125.0K+" },
  { label: "Active Passengers", value: "450.0K+" },
  { label: "Total Operators", value: "9K+" },
  { label: "Counties Covered", value: "47" },
];

export default function Stats() {
  return (
    <section className="bg-[#0b0f14] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Travelus by the <span className="text-secondary">Numbers</span>
          </h2>
          <p className="text-gray-400">
            Join thousands of Kenyans already moving smarter.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium tracking-widest text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
