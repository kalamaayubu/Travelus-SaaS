import dayjs from "dayjs";

const BASE_URL = "https://sandbox.safaricom.co.ke";

export async function getMpesaAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CUSTOMER_KEY}:${process.env.MPESA_CUSTOMER_SECRET}`,
  ).toString("base64");

  const response = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store", // Disable cache for token
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`M-Pesa Auth Failed: ${response.statusText}`, {
      cause: errorData,
    });
  }

  const data = await response.json();
  return data.access_token;
}

// Generate timestamp
export function getTimeStamp(): string {
  return dayjs().format("YYYYMMDDHHmmss");
}
