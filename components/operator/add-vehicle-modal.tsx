"use client";

import { useState } from "react";
import { Bus, CheckCircle2 } from "lucide-react";
import { VEHICLE_CATEGORIES } from "@/types/fleet";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddVehicleModal({ isOpen, onClose }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    reg: "",
    typeId: "",
  });

  const selectedCategory = VEHICLE_CATEGORIES.find(
    (c) => c.id === formData.typeId
  );

  const handleComplete = () => {
    // Logic for adding to DB goes here
    console.log("Saving Vehicle:", formData);
    onClose();
  };

  const isFormValid = formData.reg.length >= 6 && formData.typeId !== "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-bg-soft border-white/10 text-white p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight">
            Register <span className="text-secondary">Vehicle</span>
          </DialogTitle>
          <DialogDescription className="text-gray-500 font-medium">
            Add a new bus or shuttle to your fleet inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* VEHICLE TYPE SELECTION */}
          <div className="space-y-3">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Vehicle Classification
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, typeId: value })
              }
            >
              <SelectTrigger className="w-full bg-bg-dark border-white/10 p-4 rounded-md text-white focus:ring-secondary focus:border-secondary transition-all">
                <SelectValue placeholder="Select vehicle type..." />
              </SelectTrigger>
              <SelectContent className="bg-bg-soft border-white/10 text-white">
                {VEHICLE_CATEGORIES.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="focus:bg-gray-800 cursor-pointer font-medium py-3"
                  >
                    <div className="flex flex-col">
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* PLATE NUMBER INPUT */}
          <div className="space-y-3">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Plate Number (Registration)
            </Label>
            <div className="relative">
              <Input
                placeholder="E.G. KCH 001Z"
                className="bg-bg-dark border-white/10 h-16 rounded-xl text-2xl font-black uppercase tracking-widest px-6 focus-visible:ring-secondary focus-visible:border-secondary transition-all placeholder:text-gray-800"
                value={formData.reg}
                onChange={(e) =>
                  setFormData({ ...formData, reg: e.target.value })
                }
              />
              <Bus className="absolute right-6 top-1/2 -translate-y-1/2 text-white/5 size-8" />
            </div>
          </div>

          {/* SUMMARY PREVIEW */}
          {selectedCategory && (
            <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center text-black font-black">
                  {selectedCategory.capacity}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase">
                    Configured Layout
                  </p>
                  <p className="text-sm font-bold">{selectedCategory.name}</p>
                </div>
              </div>
              <CheckCircle2 className="size-5 text-secondary" />
            </div>
          )}
        </div>

        <DialogFooter className="p-8 pt-0">
          <button
            disabled={!isFormValid}
            onClick={handleComplete}
            className={`w-full py-3 rounded-xl font-black transition-all ${
              isFormValid
                ? "bg-secondary text-black hover:bg-secondary/90"
                : "bg-white/5 text-gray-600"
            }`}
          >
            Complete Registration
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
