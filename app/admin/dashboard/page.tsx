"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Clock,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define types for dashboard data
type DashboardData = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: RecentOrder[];
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
  revenueChangePercentage: number;
  orderChangePercentage: number;
  newProductsThisMonth: number;
  customerChangePercentage: number;
};

type RecentOrder = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
};

type MonthlyRevenue = {
  month: string;
  revenue: number;
};

type TopProduct = {
  id: string;
  name: string;
  totalSold: number;
  orderCount: number;
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/dashboard");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="mt-4 text-xl font-semibold">
            Loading dashboard data...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-red-500">{error}</h2>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const getStatusColor = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "CASH_ON_DELIVERY":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "CARD":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "BANK_TRANSFER":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <Clock className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rs. {dashboardData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {dashboardData.revenueChangePercentage > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />+
                  {dashboardData.revenueChangePercentage.toFixed(1)}% from last
                  month
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  {dashboardData.revenueChangePercentage.toFixed(1)}% from last
                  month
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {dashboardData.orderChangePercentage > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />+
                  {dashboardData.orderChangePercentage.toFixed(1)}% from last
                  month
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  {dashboardData.orderChangePercentage.toFixed(1)}% from last
                  month
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalProducts}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />+
              {dashboardData.newProductsThisMonth} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {dashboardData.customerChangePercentage > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />+
                  {dashboardData.customerChangePercentage.toFixed(1)}% from last
                  month
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  {dashboardData.customerChangePercentage.toFixed(1)}% from last
                  month
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dashboardData.monthlyRevenue}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      `Rs. ${
                        value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
                      }`
                    }
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `Rs. ${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              {dashboardData.topProducts.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.topProducts}
                    margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={150}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number) => [value, "Units Sold"]}
                    />
                    <Legend />
                    <Bar dataKey="totalSold" name="Units Sold" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    No product sales data available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/orders">View All</Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {dashboardData.recentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="hover:underline"
                        >
                          {order.id.substring(0, 8)}...
                        </Link>
                      </TableCell>
                      <TableCell>
                        {order.firstName} {order.lastName}
                      </TableCell>
                      <TableCell>
                        {formatDate(new Date(order.createdAt))}
                      </TableCell>
                      <TableCell>Rs. {order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                            order.paymentMethod
                          )}`}
                        >
                          {order.paymentMethod.replace("_", " ")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No recent orders found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
