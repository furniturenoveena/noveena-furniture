interface SendSMSParams {
  message: string;
  phoneNumber?: string; // Optional override for default admin number
}

/**
 * Sends an SMS notification using the Notify.lk API
 */
export async function sendSMS({
  message,
  phoneNumber,
}: SendSMSParams): Promise<boolean> {
  // Default admin phone number
  const adminPhoneNumber = "+94774820783";
  const targetNumber = phoneNumber || adminPhoneNumber;

  // Remove any '+' from the phone number as the API expects numbers without it
  const formattedNumber = targetNumber.replace("+", "");

  try {
    // Replace these values with your actual Notify.lk API credentials
    // Consider storing these in environment variables
    const NOTIFY_API_KEY = process.env.NOTIFY_API_KEY || "7zMupCmSy2pOZ4XLFGTo";
    const NOTIFY_USER_ID = process.env.NOTIFY_USER_ID || "29533";
    const NOTIFY_SENDER_ID = process.env.NOTIFY_SENDER_ID || "NotifyDEMO"; // Default sender ID

    const url = "https://app.notify.lk/api/v1/send";

    const params = new URLSearchParams({
      user_id: NOTIFY_USER_ID,
      api_key: NOTIFY_API_KEY,
      sender_id: NOTIFY_SENDER_ID,
      to: formattedNumber,
      message: message,
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      console.log(`SMS sent successfully to ${targetNumber}`);
      return true;
    } else {
      console.error("Failed to send SMS:", data);
      return false;
    }
  } catch (error) {
    console.error("Error sending SMS notification:", error);
    return false;
  }
}
