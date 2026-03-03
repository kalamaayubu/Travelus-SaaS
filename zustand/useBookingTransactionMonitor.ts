// import { PaymentStatus } from "@/types/payments";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// // Constants
// const SIX_MINUTES = 6 * 60 * 1000;

// interface Transaction {
//   bookingId: string;
//   status: PaymentStatus;
//   encryptedBookingId: string; // Made required since it's critical
//   ticketNumber: string;
//   expiresAt: number;
//   seats: string[];
// }

// type TransactionStatus = "SUCCESS" | "FAILED";
// type TransactionResolutionData = {
//   encryptedBookingId?: string; // For cases where we might need to update it
//   [key: string]: unknown;
// };

// interface BookingState {
//   activeTransaction: Transaction | null;
//   startTransaction: (
//     bookingId: string,
//     encryptedBookingId: string,
//     ticketNumber: string,
//     seats: string[],
//   ) => void;
//   resolveTransaction: (
//     status: TransactionStatus,
//     data?: TransactionResolutionData,
//   ) => void;
//   clearTransaction: () => void;
// }

// const createInitialTransaction = (
//   bookingId: string,
//   encryptedBookingId: string,
//   ticketNumber: string,
//   seats: string[],
// ): Transaction => ({
//   bookingId,
//   status: "WAITING",
//   seats,
//   expiresAt: Date.now() + SIX_MINUTES,
//   encryptedBookingId,
//   ticketNumber,
// });

// const logTransactionResolution = (
//   status: TransactionStatus,
//   data?: TransactionResolutionData,
// ) => {
//   console.log(`🟢 Resolving transaction:`, { status, data });
// };

// export const useBookingTransactionMonitor = create<BookingState>()(
//   persist(
//     (set, get) => ({
//       activeTransaction: null,

//       startTransaction: (
//         bookingId,
//         encryptedBookingId,
//         ticketNumber,
//         seats,
//       ) => {
//         const transaction = createInitialTransaction(
//           bookingId,
//           encryptedBookingId,
//           ticketNumber,
//           seats,
//         );

//         set({ activeTransaction: transaction });
//       },

//       resolveTransaction: (status, data) => {
//         const { activeTransaction: currentTransaction } = get();

//         if (!currentTransaction) return;

//         console.log("CURRENT TRANSACTION:", currentTransaction);
//         logTransactionResolution(status, data);

//         // IMPORTANT FIX: Preserve the transaction data and update status
//         set({
//           activeTransaction: {
//             ...currentTransaction,
//             status: status === "SUCCESS" ? "SUCCESS" : "FAILED",
//             // Only update encryptedBookingId if provided in data
//             ...(data?.encryptedBookingId && {
//               encryptedBookingId: data.encryptedBookingId,
//             }),
//           },
//         });
//       },

//       clearTransaction: () => set({ activeTransaction: null }),
//     }),
//     {
//       name: "booking-transaction-storage",
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );
