import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract payment notification data
    const merchantId = formData.get("merchant_id") as string;
    const orderId = formData.get("order_id") as string;
    const paymentId = formData.get("payment_id") as string;
    const payhereAmount = formData.get("payhere_amount") as string;
    const payhereCurrency = formData.get("payhere_currency") as string;
    const statusCode = formData.get("status_code") as string;
    const md5sig = formData.get("md5sig") as string;

    // Verify merchant ID
    if (merchantId !== PAYHERE_MERCHANT_ID) {
      return NextResponse.json(
        { error: "Invalid merchant ID" },
        { status: 400 }
      );
    }

    // Generate hash for verification
    const hashedSecret = crypto
      .createHash("md5")
      .update(PAYHERE_MERCHANT_SECRET!)
      .digest("hex")
      .toUpperCase();

    const localMd5sig = crypto
      .createHash("md5")
      .update(
        merchantId +
          orderId +
          payhereAmount +
          payhereCurrency +
          statusCode +
          hashedSecret
      )
      .digest("hex")
      .toUpperCase();

    // Verify hash
    if (localMd5sig !== md5sig) {
      return NextResponse.json(
        { error: "Invalid hash" },
        { status: 400 }
      );
    }

    // Update order status based on payment status
    const paymentStatus = statusCode === "2" ? "PAID" : 
                         statusCode === "0" ? "PENDING" : 
                         statusCode === "-1" ? "CANCELLED" :
                         statusCode === "-2" ? "FAILED" :
                         statusCode === "-3" ? "CHARGEBACK" : "UNKNOWN";

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        amountPaid: paymentStatus === "PAID" ? parseFloat(payhereAmount) : 0,
        paymentDate: paymentStatus === "PAID" ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayHere notification error:", error);
    return NextResponse.json(
      { error: "Failed to process payment notification" },
      { status: 500 }
    );
  }
} 