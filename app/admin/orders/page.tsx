"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

// Sample orders data
const orders = [
  {
    id: "ORD001",
    customer: "Anusha Perera",
    date: new Date(2023, 4, 15),
    amount: 185000,
    status: "Delivered",
    items: [{ name: "Elegant Leather Sofa", quantity: 1 }],
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD002",
    customer: "Dinesh Fernando",
    date: new Date(2023, 4, 14),
    amount: 97500,
    status: "Processing",
    items: [
      { name: "Modern Coffee Table", quantity: 1 },
      { name: "Corner Bookshelf", quantity: 1 },
    ],
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD003",
    customer: "Malik Jayawardena",
    date: new Date(2023, 4, 13),
    amount: 235000,
    status: "Pending",
    items: [{ name: "Premium Queen Bed", quantity: 1 }],
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD004",
    customer: "Priyanka Silva",
    date: new Date(2023, 4, 12),
    amount: 158000,
    status: "Delivered",
    items: [{ name: "Vintage Dining Table", quantity: 1 }],
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD005",
    customer: "Roshan Perera",
    date: new Date(2023, 4, 11),
    amount: 75000,
    status: "Processing",
    items: [{ name: "Ergonomic Office Chair", quantity: 1 }],
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD006",
    customer: "Chaminda Gunawardena",
    date: new Date(2023, 4, 10),
    amount: 320000,
    status: "Delivered",
    items: [{ name: "King Size Four-Poster Bed", quantity: 1 }],
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD007",
    customer: "Nimal Perera",
    date: new Date(2023, 4, 9),
    amount: 45000,
    status: "Cancelled",
    items: [{ name: "Antique Side Table", quantity: 1 }],
    paymentMethod: "Cash on Delivery",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No orders found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <>
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>Rs. {order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : order.status === "Pending"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {expandedOrder === order.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedOrder === order.id && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-muted/50 p-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Order Items</h4>
                              <ul className="space-y-1 text-sm">
                                {order.items.map((item, index) => (
                                  <li key={index}>
                                    {item.quantity}x {item.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Payment Method</h4>
                                <p className="text-sm">{order.paymentMethod}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Actions</h4>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Update Status
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
