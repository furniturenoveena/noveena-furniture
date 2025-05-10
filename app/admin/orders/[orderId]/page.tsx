"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

// Define Order type based on the schema
type Order = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  orderNotes?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  colorId?: string;
  productImage?: string;
  productCategory?: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};

export default function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Order not found");
          }
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch order details"
        );
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-red-50 rounded-lg border border-red-200 mt-10">
        <h1 className="text-2xl font-bold text-red-700 mb-4">Error</h1>
        <p className="text-red-600">{error}</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/admin/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-muted rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p>We couldn't find the order you're looking for.</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/admin/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to orders</span>
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">Back to orders</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.id.slice(-6).toUpperCase()}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">
              {formatDate(new Date(order.createdAt))}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>Contact Customer</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Date Placed</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm text-muted-foreground">{`${order.firstName} ${order.lastName}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Contact Number</p>
                  <p className="text-sm text-muted-foreground">{order.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Shipping Address</p>
                  <p className="text-sm text-muted-foreground">
                    {order.addressLine1}
                    {order.addressLine2 && `, ${order.addressLine2}`}
                    {`, ${order.city}, ${order.province}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">
                    {order.paymentMethod === "CASH_ON_DELIVERY"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {order.orderNotes && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-1">Order Notes:</p>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                  {order.orderNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Items and Payment Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b pb-4">
                  <div className="flex gap-3">
                    {order.productImage ? (
                      <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{order.productName}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quantity: {order.quantity}
                      </p>
                      {order.productCategory && (
                        <p className="text-sm text-muted-foreground">
                          Category: {order.productCategory}
                        </p>
                      )}
                      {order.colorId && (
                        <p className="text-sm text-muted-foreground">
                          Color ID: {order.colorId}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="font-medium">
                    Rs. {(order.productPrice * order.quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {order.productId && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href={`/product/${order.productId}`}>
                      View Product Details
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm">Product Price</p>
                  <p className="text-sm font-medium">
                    Rs. {order.productPrice.toLocaleString()} × {order.quantity}
                  </p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-medium">
                    Rs. {order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
