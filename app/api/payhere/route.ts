import { NextResponse } from "next/server";
import crypto from "crypto";

// PayHere configuration
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
const PAYHERE_BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://www.payhere.lk/pay/checkout"
  : "https://sandbox.payhere.lk/pay/checkout";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      amount,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country = "Sri Lanka",
      items,
    } = body;

    // Format amount to 2 decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);
    const currency = "LKR";

    // Generate hash
    const hashedSecret = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET!)
      .digest("hex")
      .toUpperCase();

    const hash = crypto
      .createHash("md5")
      .update(
        PAYHERE_MERCHANT_ID +
          orderId +
          formattedAmount +
          currency +
          hashedSecret
      )
      .digest("hex")
      .toUpperCase();

    // Prepare PayHere form data
    const formData = {
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payhere/notify`,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: country,
      order_id: orderId,
      items: items,
      currency: currency,
      amount: formattedAmount,
      hash: hash,
    };

    return NextResponse.json({ 
      success: true, 
      formData,
      checkoutUrl: PAYHERE_BASE_URL 
    });
  } catch (error) {
    console.error("PayHere integration error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
} 