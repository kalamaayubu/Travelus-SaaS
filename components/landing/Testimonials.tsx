import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Mwangi",
    role: "Matatu Operator",
    stat: "3x Revenue Growth",
    quote:
      "Travelus made managing my trips effortless! I can fill my seats faster and I don't have to worry about payments anymore.",
    color: "blue",
  },
  {
    name: "Sarah Kamau",
    role: "Regular Passenger",
    stat: "50+ Trips",
    quote:
      "Booking seats has never been this easy. I love knowing exactly which vehicle I'm taking and where to catch it.",
    color: "green",
  },
  {
    name: "David Ochieng",
    role: "Long Distance Driver",
    stat: "95% Ratings",
    quote:
      "The flexible commission model is a game changer. I keep more of what I earn compared to other platforms.",
    color: "amber",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0b0f14] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Success Stories from Kenya
          </h2>
          <p className="text-gray-400">
            Real people, real results. See how Travelus is changing lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-8 rounded-xl bg-linear-to-br from-white/10 to-transparent border border-white/10"
            >
              <Quote className="absolute top-6 right-6 size-8 text-white/5" />
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 
                    ${
                      t.color === "blue"
                        ? "bg-blue-500/20 text-blue-400"
                        : t.color === "green"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {t.stat}
                  </span>
                  <p className="text-lg text-gray-200 leading-relaxed italic font-medium">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-4">
                  <div className="size-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary border border-secondary/20">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
