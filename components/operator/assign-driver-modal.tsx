"use client";

import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  User,
  Car,
  ShipWheel,
  FerrisWheel,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock Data - In real app, these come from your Fleet and Staff states
const DRIVERS = [
  { id: "d1", name: "Peter Maina", phone: "0712..." },
  { id: "d2", name: "Sarah Juma", phone: "0722..." },
  { id: "d3", name: "David Ochieng", phone: "0733..." },
];

interface AssignDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleReg: string; // The vehicle we are assigning to
}

export function AssignDriverModal({
  isOpen,
  onClose,
  vehicleReg,
}: AssignDriverModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  const handleAssign = () => {
    // Logic to update the assignment in DB
    console.log(`Assigning Driver ${selectedDriverId} to ${vehicleReg}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-soft-dark border-white/10 text-white rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <FerrisWheel className="text-secondary size-5" />
            Assign <span className="text-secondary">Vehicle</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* VEHICLE INFO CARD */}
          <div className="bg-dark p-4 rounded-lg border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-gray4">
                <Car size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray5 uppercase">
                  Target Vehicle
                </p>
                <p className="text-sm font-black text-white">{vehicleReg}</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">
              Available
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray4 uppercase tracking-widest">
              Search Driver
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="flex items-center px-4">
                <button
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-dark border-white/10 h-14 rounded-lg hover:bg-dark hover:text-white"
                >
                  {selectedDriverId
                    ? DRIVERS.find((d) => d.id === selectedDriverId)?.name
                    : "Select a driver..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-soft-dark border-white/10">
                <Command className="bg-transparent text-white">
                  <CommandInput
                    placeholder="Search name or phone..."
                    className="text-white"
                  />
                  <CommandList>
                    <CommandEmpty>No driver found.</CommandEmpty>
                    <CommandGroup>
                      {DRIVERS.map((driver) => (
                        <CommandItem
                          key={driver.id}
                          value={driver.name}
                          onSelect={() => {
                            setSelectedDriverId(driver.id);
                            setOpen(false);
                          }}
                          className="hover:bg-gray8 cursor-pointer py-3"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 text-secondary",
                              selectedDriverId === driver.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-bold">{driver.name}</span>
                            <span className="text-[10px] opacity-50">
                              {driver.phone}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="p-8 pt-0">
          <button
            onClick={handleAssign}
            disabled={!selectedDriverId}
            className="w-full py-3 bg-secondary text-black font-black hover:bg-secondary/90 rounded-lg disabled:bg-white/5 disabled:text-gray6"
          >
            Confirm Assignment
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
