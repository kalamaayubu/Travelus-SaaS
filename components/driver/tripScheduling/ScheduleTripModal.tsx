"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { TripSchedulingFields } from "@/types/driver";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  defaultMpesa: string;
}

export default function ScheduleTripModal({
  isOpen,
  onClose,
  defaultMpesa = "0712345678",
}: ModalProps) {
  const [step, setStep] = useState(1);
  const methods = useForm<TripSchedulingFields>({
    mode: "onChange",
    defaultValues: {
      mpesaNumber: defaultMpesa,
      origin: "",
      destination: "",
      price: "",
      departureDate: "",
      departureTime: "",
      vehicle: "",
      pickupPoints: "",
      dropoffPoints: "",
    },
  });

  if (!isOpen) return null;

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    let fieldsToValidate: (keyof TripSchedulingFields)[] = [];
    if (step === 1) fieldsToValidate = ["origin", "destination", "price"];
    if (step === 2)
      fieldsToValidate = ["departureDate", "departureTime", "vehicle"];
    if (step === 3) fieldsToValidate = ["mpesaNumber"];

    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) setStep((s) => s + 1);
  };

  const onSubmit = (data: TripSchedulingFields) => {
    console.log("Trip Published:", data);
    methods.reset();
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-soft-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-1 w-full bg-white/5 flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-full transition-all duration-500",
                s <= step ? "bg-primary w-1/4" : "w-0",
              )}
            />
          ))}
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                  Step {step} of 4
                </span>
                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
                  {step === 1 && "Route & Pricing"}
                  {step === 2 && "Schedule & Vehicle"}
                  {step === 3 && "Logistics & Payout"}
                  {step === 4 && "Review & Confirm"}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray4 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-70">
              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour formData={methods.getValues()} />}
            </div>

            <div className="flex gap-4 pt-6 mt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
                className="flex-1 h-12 bg-white/5 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} /> {step === 1 ? "Cancel" : "Back"}
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-2 h-12 primary-btn uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  Next Step <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-2 h-12 text-black font-bold uppercase primary-btn tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={3} /> Publish Trip
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
