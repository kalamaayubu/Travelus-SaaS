"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "var(--color-soft-dark)",
          color: "var(--text-white)",
          border: "1px solid var(--color-gray7)",
          borderRadius: "0.5rem",
          fontSize: "14px",
        },
        className: "font-sans",
      }}
    />
  );
}
