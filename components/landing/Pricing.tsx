"use client";

export default function Pricing() {
  return (
    <section id="Pricing" className="py-24 bg-bgSoft">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-8">
        <div className="border border-white/5 rounded-lg p-6">
          <h3 className="font-semibold">Pay As You Go</h3>
          <p className="text-primary text-2xl mt-2">10% per seat</p>
        </div>

        <div className="border border-gold rounded-lg p-6">
          <h3 className="font-semibold">Pro Subscription</h3>
          <p className="text-gold text-2xl mt-2">KES 2,500 / mo</p>
        </div>
      </div>
    </section>
  );
}
