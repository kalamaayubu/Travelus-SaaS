"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "For Passengers",
    questions: [
      {
        q: "How do I book a trip?",
        a: "Simply search for your destination, select your preferred vehicle and seat, and pay via M-Pesa or Card to receive an instant ticket.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes. We use industry-standard encryption and direct mobile money integration to ensure your funds are handled safely.",
      },
      {
        q: "Can I cancel my booking?",
        a: "Cancellations are possible based on the operator's policy. Check your ticket details for the specific refund window.",
      },
    ],
  },
  {
    category: "For Operators & Drivers",
    questions: [
      {
        q: "What are the signup requirements?",
        a: "You'll need a valid DL, vehicle insurance, and PSV compliance documents to be verified on the platform.",
      },
      {
        q: "How much does it cost to use Travelus?",
        a: "We offer flexible models: a small commission per seat sold or a monthly subscription for fleet owners.",
      },
      {
        q: "How do I get paid?",
        a: "Payments are processed instantly to your Travelus wallet and can be withdrawn to M-Pesa or Bank anytime.",
      },
    ],
  },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="bg-[#0b0f14] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            FAQs
          </h2>
          <p className="text-gray-400">
            Find answers to common questions from both passengers and operators.
          </p>
        </div>

        <div className="space-y-16">
          {faqs.map((cat, idx) => (
            <div key={idx}>
              <h3 className="text-primary font-bold text-xl mb-6 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                {cat.category}
              </h3>
              <div className="space-y-2">
                {cat.questions.map((faq, fIdx) => {
                  const id = `${idx}-${fIdx}`;
                  const isOpen = openFaq === id;
                  return (
                    <div
                      key={id}
                      className={`rounded-xl transition-all ${
                        isOpen ? "bg-gray-50/10" : "bg-gray-50/5"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : id)}
                        className="w-full p-6 flex justify-between items-center text-left text-white hover:text-secondary transition-colors"
                      >
                        <span className="text-lg font-medium pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <Minus className="size-5 shrink-0" />
                        ) : (
                          <Plus className="size-5 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
