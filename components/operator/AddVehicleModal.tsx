"use client";

import { useState } from "react";
import { Bus, CheckCircle2 } from "lucide-react";
import { VEHICLE_CATEGORIES } from "@/types/fleet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseModal } from "../shared/BaseModal";

export function AddVehicleModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({ reg: "", typeId: "" });
  const selectedCategory = VEHICLE_CATEGORIES.find(
    (c) => c.id === formData.typeId,
  );
  const isFormValid = formData.reg.length >= 6 && formData.typeId !== "";

  const handleComplete = () => {
    console.log("Saving Vehicle:", formData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Register Vehicle"
      description="Add a new bus or shuttle to your fleet inventory."
      footer={
        <button
          disabled={!isFormValid}
          onClick={handleComplete}
          className={`w-full py-4 rounded-xl font-black transition-all ${
            isFormValid
              ? "bg-secondary text-black hover:bg-secondary/90"
              : "bg-white/5 text-gray6"
          }`}
        >
          Complete Registration
        </button>
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-gray4 uppercase tracking-widest px-1">
            Classification
          </Label>
          <Select
            onValueChange={(v) => setFormData({ ...formData, typeId: v })}
          >
            <SelectTrigger className="w-full bg-dark border-white/10 h-14 rounded-xl text-white">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent className="bg-soft-dark border-white/10 text-white">
              {VEHICLE_CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="py-3">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-bold text-gray4 uppercase tracking-widest px-1">
            Plate Number
          </Label>
          <div className="relative">
            <Input
              placeholder="E.G. KCH 001Z"
              className="bg-dark border-white/10 h-16 rounded-xl text-2xl font-black uppercase tracking-widest px-6"
              value={formData.reg}
              onChange={(e) =>
                setFormData({ ...formData, reg: e.target.value })
              }
            />
            <Bus className="absolute right-6 top-1/2 -translate-y-1/2 text-white/5 size-8" />
          </div>
        </div>

        {selectedCategory && (
          <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-black font-black">
                {selectedCategory.capacity}
              </div>
              <p className="text-sm font-bold text-white">
                {selectedCategory.name}
              </p>
            </div>
            <CheckCircle2 className="size-5 text-secondary" />
          </div>
        )}
      </div>
    </BaseModal>
  );
}
