"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Download, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
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
  amountPaid?: number;
  paymentStatus?: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.firstName} ${order.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    return matchesSearch;
  });

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-red-50 rounded-lg border border-red-200 mt-10">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          Error Loading Orders
        </h1>
        <p className="text-red-600">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Orders
        </h1>
        <Button variant="outline" className="w-full sm:w-auto justify-center">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>{" "}
      {/* Orders Table */}
      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No orders found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  return (
                    <>
                      {" "}
                      <TableRow
                        key={order.id}
                        className="cursor-pointer"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <TableCell className="font-medium">
                          {order.id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(new Date(order.createdAt))}
                        </TableCell>
                        <TableCell>
                          Rs. {order.total.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              {expandedOrder === order.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">Toggle details</span>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/orders/${order.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order.id && (
                        <TableRow>
                          <TableCell colSpan={5} className="bg-muted/50 p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Order Items
                                </h4>
                                <ul className="space-y-1 text-sm">
                                  <li>
                                    {order.quantity}x {order.productName}
                                  </li>
                                </ul>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Customer Info
                                  </h4>
                                  <p className="text-sm">{order.phone}</p>
                                  <p className="text-sm">
                                    {order.addressLine1},{" "}
                                    {order.addressLine2 &&
                                      `${order.addressLine2}, `}
                                    {order.city}, {order.province}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Payment Details
                                  </h4>{" "}
                                  <p className="text-sm">
                                    Method:{" "}
                                    {order.paymentMethod === "PAYHERE"
                                      ? "PayHere"
                                      : order.paymentMethod ===
                                        "CASH_ON_DELIVERY"
                                      ? "Cash on Delivery"
                                      : order.paymentMethod}
                                  </p>
                                  <p className="text-sm font-medium">
                                    Total: Rs. {order.total.toLocaleString()}
                                  </p>
                                  {order.paymentStatus && (
                                    <p
                                      className={`text-sm ${
                                        order.paymentStatus === "PAID"
                                          ? "text-green-600"
                                          : order.paymentStatus === "PENDING"
                                          ? "text-amber-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      Status:{" "}
                                      {order.paymentStatus === "PAID"
                                        ? "Paid"
                                        : order.paymentStatus === "PENDING"
                                        ? "Pending"
                                        : "Unpaid"}
                                    </p>
                                  )}
                                  {order.amountPaid !== undefined &&
                                    order.amountPaid > 0 && (
                                      <p className="text-sm">
                                        Paid: Rs.{" "}
                                        {order.amountPaid.toLocaleString()}
                                      </p>
                                    )}
                                </div>
                              </div>
                              <div className="pt-2 border-t">
                                <Button
                                  size="sm"
                                  asChild
                                  className="hover:bg-white hover:text-primary border border-transparent hover:border-primary"
                                >
                                  <Link href={`/admin/orders/${order.id}`}>
                                    View Full Details
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
