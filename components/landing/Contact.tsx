"use client";

import { Mail, Phone, Send, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact Form:", data);
    toast.success("Message sent! We'll get back to you shortly.");
    reset();
  };

  return (
    <section className="py-24 max-w-5xl mx-auto px-4" id="contact">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Info */}
        <div className="flex flex-col justify-center">
          <div className="text-center lg:text-start mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-gray4 leading-relaxed">
              Have questions about a route or need help with a booking? Our team
              is available 24/7 to keep you moving.
            </p>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <ContactCard
              href="tel:+254712345678"
              icon={<Phone className="text-primary" size={24} />}
              title="Direct Call"
              value="+254 712 345 678"
              subtitle="Hotline, contact us directly"
            />
            <ContactCard
              href="https://wa.me/254795753289?text=Hi%20there!%20"
              icon={<MessageSquare className="text-[#25D366]" size={24} />} // WhatsApp Green
              title="WhatsApp Us"
              value="Chat on WhatsApp"
              subtitle="We'll get back to you as soon as possible"
            />
            <ContactCard
              href="mailto:traveluus@gmail.com"
              icon={<Mail className="text-secondary" size={24} />}
              title="Email Support"
              value="support@yourtransitapp.com"
              subtitle="Best for formal inquiries"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-soft-dark border border-white/5 p-4 md:p-6 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-fit">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full h-12 bg-bg-soft border border-white/10 rounded-xl px-4 text-white focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray2">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full h-12 bg-bg-soft border border-white/10 rounded-xl px-4 text-white focus:border-primary outline-none transition-all"
                  placeholder="07..."
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray2">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={4}
                className="w-full bg-bg-soft border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all resize-none"
                placeholder="How can we help you?"
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="primary-btn w-full h-14 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              <span className="uppercase tracking-[0.2em] font-black text-sm">
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              <Send size={18} className={isSubmitting ? "animate-pulse" : ""} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, value, subtitle, href }: any) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex gap-5 items-start p-4 bg-bg-soft/20 border border-gray6/5 rounded-2xl hover:bg-white/5 hover:border-gray8/10 transition-all group cursor-pointer"
    >
      <div className="size-12 bg-bg-soft border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray3 mb-1">
          {title}
        </h4>
        <p className="text-white font-bold text-lg mb-0.5">{value}</p>
        <p className="text-gray4 text-xs italic tracking-wide">{subtitle}</p>
      </div>
    </a>
  );
}
