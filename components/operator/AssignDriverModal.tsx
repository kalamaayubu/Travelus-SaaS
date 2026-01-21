"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Car, FerrisWheel } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BaseModal } from "../shared/BaseModal";

const DRIVERS = [
  { id: "d1", name: "Peter Maina", phone: "0712..." },
  { id: "d2", name: "Sarah Juma", phone: "0722..." },
];

export function AssignDriverModal({
  isOpen,
  onClose,
  vehicleReg,
}: {
  isOpen: boolean;
  onClose: () => void;
  vehicleReg: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="sm:max-w-[425px]"
      icon={<FerrisWheel className="text-secondary size-5" />}
      title="Assign Driver"
      footer={
        <button
          onClick={() => {
            console.log("Assigned");
            onClose();
          }}
          disabled={!selectedDriverId}
          className="w-full py-3 bg-secondary text-black font-black rounded-lg disabled:bg-white/5"
        >
          Confirm Assignment
        </button>
      }
    >
      <div className="space-y-6">
        <div className="bg-dark p-4 rounded-lg border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 text-gray4">
              <Car size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray5 uppercase">
                Vehicle
              </p>
              <p className="text-sm font-black text-white">{vehicleReg}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray4 uppercase tracking-widest">
            Search Driver
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center justify-between bg-dark border-white/10 h-14 rounded-lg px-4">
                {selectedDriverId
                  ? DRIVERS.find((d) => d.id === selectedDriverId)?.name
                  : "Select driver..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-soft-dark border-white/10">
              <Command className="bg-transparent text-white">
                <CommandInput
                  placeholder="Search name..."
                  className="text-white"
                />
                <CommandList>
                  <CommandEmpty>No driver found.</CommandEmpty>
                  <CommandGroup>
                    {DRIVERS.map((driver) => (
                      <CommandItem
                        key={driver.id}
                        onSelect={() => {
                          setSelectedDriverId(driver.id);
                          setOpen(false);
                        }}
                        className="hover:bg-gray8 py-3"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-secondary",
                            selectedDriverId === driver.id
                              ? "opacity-100"
                              : "opacity-0",
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
    </BaseModal>
  );
}
