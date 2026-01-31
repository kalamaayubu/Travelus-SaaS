import { useState } from "react";
import { useForm } from "react-hook-form";

export type BookingStep = "SEATS" | "DETAILS" | "PAYMENT";

export interface PassangerBookingFields {
  fullName: string;
  contactPhone: string;
  mpesaPhone: string;
  email?: string;
}

export const useBookingLogic = (tripPrice: number) => {
  const [step, setStep] = useState<BookingStep>("SEATS");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const formMethods = useForm<PassangerBookingFields>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      contactPhone: "",
      mpesaPhone: "",
      email: "",
    },
  });

  const formData = formMethods.watch();
  const totalFare = selectedSeats.length * tripPrice;

  const handleSeatClick = (id: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const nextStep = () => {
    if (step === "SEATS") setStep("DETAILS");
    else if (step === "DETAILS") setStep("PAYMENT");
  };

  const prevStep = () => {
    if (step === "DETAILS") setStep("SEATS");
    else if (step === "PAYMENT") setStep("DETAILS");
  };

  return {
    step,
    selectedSeats,
    totalFare,
    formMethods,
    formData,
    handleSeatClick,
    nextStep,
    prevStep,
  };
};
