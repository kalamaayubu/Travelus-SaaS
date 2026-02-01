/**
 * @hook useBookingLogic
 * @description Manages the state machine for the three-step booking (Seats -> Details -> Payment).
 * @param {number} tripPrice - The cost per seat used to calculate the total fare.
 * @returns {Object} Logic bundle including:
 * - {BookingStep} step: Current active phase of the drawer.
 * - {string[]} selectedSeats: Array of seat IDs selected by the user.
 * - {number} totalFare: Dynamic calculation of seats * price.
 * - {Function} nextStep/prevStep: Navigation handlers.
 */

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

  const formData = formMethods.getValues();
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
