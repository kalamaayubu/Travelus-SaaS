"use client";

export default function HowItWorks() {
  return (
    <section id="How It Works" className="py-24 bg-bgSoft">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
        {["Operators & Drivers", "Passengers"].map((role) => (
          <div key={role}>
            <h3 className="text-xl font-semibold mb-6">{role}</h3>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex gap-4 mb-4">
                <span className="text-primary font-bold">{step}</span>
                <p className="text-gray-400">Step description goes here</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
