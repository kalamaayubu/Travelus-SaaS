"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl font-bold">Ready to hit the road?</h2>
      <div className="mt-6 flex justify-center gap-4">
        <button className="rounded-md bg-linear-to-r from-primary to-primaryDark px-6 py-3 text-black">
          Sign Up as Driver
        </button>
        <button className="rounded-md border border-gold px-6 py-3 text-gold">
          Find a Ride
        </button>
      </div>
    </section>
  );
}
