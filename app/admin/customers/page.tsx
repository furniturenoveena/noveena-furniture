"use client"

import { useState } from "react"
import { Search, MoreHorizontal, UserPlus, Mail, Phone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

// Sample customers data
const customers = [
  {
    id: 1,
    name: "Anusha Perera",
    email: "anusha.perera@example.com",
    phone: "+94 77 123 4567",
    status: "active",
    totalOrders: 5,
    totalSpent: 345000,
    lastOrder: new Date(2023, 4, 15),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dinesh Fernando",
    email: "dinesh.fernando@example.com",
    phone: "+94 76 234 5678",
    status: "active",
    totalOrders: 3,
    totalSpent: 97500,
    lastOrder: new Date(2023, 4, 14),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Malik Jayawardena",
    email: "malik.j@example.com",
    phone: "+94 71 345 6789",
    status: "inactive",
    totalOrders: 1,
    totalSpent: 235000,
    lastOrder: new Date(2023, 3, 20),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Priyanka Silva",
    email: "priyanka.silva@example.com",
    phone: "+94 70 456 7890",
    status: "active",
    totalOrders: 2,
    totalSpent: 158000,
    lastOrder: new Date(2023, 4, 12),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Roshan Perera",
    email: "roshan.p@example.com",
    phone: "+94 75 567 8901",
    status: "active",
    totalOrders: 4,
    totalSpent: 275000,
    lastOrder: new Date(2023, 4, 11),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Chaminda Gunawardena",
    email: "chaminda.g@example.com",
    phone: "+94 77 678 9012",
    status: "active",
    totalOrders: 6,
    totalSpent: 520000,
    lastOrder: new Date(2023, 4, 10),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Nimal Perera",
    email: "nimal.perera@example.com",
    phone: "+94 76 789 0123",
    status: "inactive",
    totalOrders: 1,
    totalSpent: 45000,
    lastOrder: new Date(2023, 2, 15),
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter customers based on search query and status filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No customers found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={customer.status === "active" ? "default" : "secondary"}
                        className={customer.status === "active" ? "bg-green-500" : ""}
                      >
                        {customer.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>Rs. {customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(customer.lastOrder)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
