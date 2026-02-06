import * as z from "zod";

const baseSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required")
    .min(4, "Full name must have atleast 4 characters"),
  email: z.email("Please enter a valid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
});

export const DriverSchema = baseSchema;

export const LoginSchema = baseSchema.pick({
  email: true,
  password: true,
});

export const TicketPrintSchema = z.object({
  ticketNumber: z
    .string()
    .min(1, "Ticket number is required")
    .length(8, "Ticket must be 8 characters long")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
      "Ticket must contain both letters and numbers",
    )
    .transform((val) => val.toUpperCase().trim()),
  email: z
    .email("Invalid email address")
    .transform((val) => val.toLowerCase().trim()),
});
