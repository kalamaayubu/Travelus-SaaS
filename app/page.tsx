import Footer from "@/components/Footer";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import FinalCTA from "@/components/landing/FinalCTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
