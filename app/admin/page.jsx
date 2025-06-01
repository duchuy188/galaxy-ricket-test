"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, TrendingUp, Calendar, Edit, Lock, Unlock, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  const { user, users, updateUser, toggleUserLock } = useAuth()
  const router = useRouter()
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/signin")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

  // Mock revenue data
  const revenueData = {
    totalRevenue: 125000,
    monthlyRevenue: 15000,
    totalBookings: 2500,
    monthlyBookings: 320,
    recentTransactions: [
      { id: 1, user: "John Doe", movie: "Avatar 3", amount: 25, date: "2024-01-15" },
      { id: 2, user: "Jane Smith", movie: "Spider-Man 4", amount: 30, date: "2024-01-15" },
      { id: 3, user: "Bob Johnson", movie: "The Batman 2", amount: 20, date: "2024-01-14" },
      { id: 4, user: "Alice Brown", movie: "Dune 3", amount: 35, date: "2024-01-14" },
      { id: 5, user: "Charlie Wilson", movie: "Fast X 2", amount: 25, date: "2024-01-13" },
    ],
    monthlyStats: [
      { month: "Jan", revenue: 15000, bookings: 320 },
      { month: "Dec", revenue: 18000, bookings: 380 },
      { month: "Nov", revenue: 12000, bookings: 250 },
      { month: "Oct", revenue: 16000, bookings: 340 },
      { month: "Sep", revenue: 14000, bookings: 290 },
    ],
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: "",
    })
  }

  const handleUpdateUser = () => {
    const updatedData = { ...editForm }
    if (!updatedData.password) {
      delete updatedData.password
    }
    updateUser(editingUser.id, updatedData)
    setEditingUser(null)
    setEditForm({})
  }

  const handleToggleLock = (userId) => {
    toggleUserLock(userId)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.fullName}</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Revenue Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, edit information, and control access</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.fullName}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "admin" ? "destructive" : user.role === "staff" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isLocked ? "destructive" : "default"}>
                            {user.isLocked ? "Locked" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit User</DialogTitle>
                                  <DialogDescription>
                                    Update user information and reset password if needed
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                      id="fullName"
                                      value={editForm.fullName || ""}
                                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      value={editForm.email || ""}
                                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                      id="phone"
                                      value={editForm.phone || ""}
                                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="password">New Password (leave empty to keep current)</Label>
                                    <Input
                                      id="password"
                                      type="password"
                                      value={editForm.password || ""}
                                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                      placeholder="Enter new password"
                                    />
                                  </div>
                                  <Button onClick={handleUpdateUser} className="w-full">
                                    Update User
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant={user.isLocked ? "default" : "destructive"}
                              size="sm"
                              onClick={() => handleToggleLock(user.id)}
                            >
                              {user.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            {/* Revenue Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">All time earnings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${revenueData.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{revenueData.totalBookings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{revenueData.monthlyBookings}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest booking transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Movie</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{transaction.movie}</TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Monthly Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Revenue and booking trends over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{stat.month} 2024</div>
                        <div className="text-sm text-gray-500">{stat.bookings} bookings</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${stat.revenue.toLocaleString()}</div>
                        <div className="text-sm text-green-600">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
