import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const excludeId = searchParams.get("excludeId");
    const limit = parseInt(searchParams.get("limit") || "4", 10);

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    // Find similar products in the same category
    const similarProducts = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
        ...(excludeId && { id: { not: excludeId } }),
      },
      include: {
        category: true,
      },
      take: limit,
    });

    return NextResponse.json(similarProducts);
  } catch (error) {
    console.error("[SIMILAR_PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
