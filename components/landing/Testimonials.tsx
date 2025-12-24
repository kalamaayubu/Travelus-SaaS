"use client";

export default function Testimonials() {
  return (
    <section id="Testimonials" className="py-24 bg-bgSoft">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-6">
        {["James Mwangi", "Sarah Kamau", "David Ochieng"].map((name) => (
          <div
            key={name}
            className="rounded-lg bg-bgDark p-6 border border-white/5"
          >
            <p className="text-sm text-gray-400">
              Travelus changed how I move and earn across Kenya.
            </p>
            <p className="mt-4 font-semibold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
