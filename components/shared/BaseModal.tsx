"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  icon?: React.ReactNode;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "sm:max-w-[500px]",
  icon,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-soft-dark border-white/10 text-white p-0 overflow-hidden rounded-2xl shadow-2xl",
          maxWidth,
        )}
      >
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-gray4 font-medium">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="p-8 pt-6 space-y-6">{children}</div>

        {footer && <div className="p-8 pt-0">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
