import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      phone,
      orderNotes,
      addressLine1,
      addressLine2,
      city,
      province,
      productId,
      productName,
      productPrice,
      quantity,
      colorValue,
      colorName,
      productImage,
      productCategory,
      total,
      paymentMethod,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !addressLine1 ||
      !city ||
      !province ||
      !productId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const order = await prisma.order.create({
      data: {
        firstName,
        lastName,
        phone,
        orderNotes: orderNotes || "",
        addressLine1,
        addressLine2: addressLine2 || "",
        city,
        province,
        productId,
        productName,
        productPrice,
        quantity: quantity || 1,
        colorValue: colorValue || "",
        colorName: colorName || "",
        productImage: productImage || "",
        productCategory: productCategory || "",
        total,
        paymentMethod: paymentMethod || "PAYHERE",
        amountPaid: body.amountPaid || 0,
        paymentDate: body.paymentDate || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
      order,
    });
  } catch (error: any) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Failed to process order", details: error.message },
      { status: 500 }
    );
  }
}
