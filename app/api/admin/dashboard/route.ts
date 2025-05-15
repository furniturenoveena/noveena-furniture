import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get total revenue (sum of all order totals)
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    // Get total number of orders
    const totalOrders = await prisma.order.count();

    // Get total number of products
    const totalProducts = await prisma.product.count();

    // Get total number of unique customers (based on unique combinations of firstName, lastName, and phone)
    const customers = await prisma.order.groupBy({
      by: ["firstName", "lastName", "phone"],
    });
    const totalCustomers = customers.length;

    // Get recent orders (last 5)
    const recentOrders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        total: true,
        paymentMethod: true,
      },
    });

    // Get monthly revenue for the chart
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        total: true,
        createdAt: true,
      },
    });

    // Group orders by month
    const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      const year = date.getFullYear();

      const ordersInMonth = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getMonth() === month && orderDate.getFullYear() === year
        );
      });

      const revenue = ordersInMonth.reduce(
        (acc, order) => acc + order.total,
        0
      );

      return {
        month: date.toLocaleString("default", { month: "short" }),
        revenue,
      };
    }).reverse();

    // Get top selling products
    const ordersByProduct = await prisma.order.groupBy({
      by: ["productId", "productName"],
      _sum: {
        quantity: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const topProducts = ordersByProduct.map((item) => ({
      id: item.productId,
      name: item.productName,
      totalSold: item._sum.quantity || 0,
      orderCount: item._count.id,
    }));

    // Calculate revenue change from previous month
    const thisMonth = new Date();
    const lastMonth = new Date();
    thisMonth.setDate(1);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);

    const thisMonthOrders = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: thisMonth,
        },
      },
      _sum: {
        total: true,
      },
    });

    const lastMonthOrders = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: lastMonth,
          lt: thisMonth,
        },
      },
      _sum: {
        total: true,
      },
    });

    const currentMonthRevenue = thisMonthOrders._sum.total || 0;
    const previousMonthRevenue = lastMonthOrders._sum.total || 0;

    let revenueChangePercentage = 0;
    if (previousMonthRevenue > 0) {
      revenueChangePercentage =
        ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
        100;
    }

    // Calculate orders change from previous month
    const thisMonthOrderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: thisMonth,
        },
      },
    });

    const lastMonthOrderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: lastMonth,
          lt: thisMonth,
        },
      },
    });

    let orderChangePercentage = 0;
    if (lastMonthOrderCount > 0) {
      orderChangePercentage =
        ((thisMonthOrderCount - lastMonthOrderCount) / lastMonthOrderCount) *
        100;
    }

    // Get new products added this month
    const newProductsThisMonth = await prisma.product.count({
      where: {
        createdAt: {
          gte: thisMonth,
        },
      },
    });

    // Calculate customer change from previous month
    const thisMonthCustomers = await prisma.order.groupBy({
      by: ["firstName", "lastName", "phone"],
      where: {
        createdAt: {
          gte: thisMonth,
        },
      },
    });

    const lastMonthCustomers = await prisma.order.groupBy({
      by: ["firstName", "lastName", "phone"],
      where: {
        createdAt: {
          gte: lastMonth,
          lt: thisMonth,
        },
      },
    });

    let customerChangePercentage = 0;
    if (lastMonthCustomers.length > 0) {
      customerChangePercentage =
        ((thisMonthCustomers.length - lastMonthCustomers.length) /
          lastMonthCustomers.length) *
        100;
    }

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      monthlyRevenue,
      topProducts,
      revenueChangePercentage,
      orderChangePercentage,
      newProductsThisMonth,
      customerChangePercentage,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
