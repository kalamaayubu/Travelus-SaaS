"use client";

export default function FAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 space-y-4">
        {[
          "How do I book?",
          "Is payment secure?",
          "How do drivers get paid?",
        ].map((q) => (
          <details key={q} className="rounded-lg bg-bgSoft p-4">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-2 text-sm text-gray-400">Answer goes here.</p>
          </details>
        ))}
      </div>
    </section>
  );
}
