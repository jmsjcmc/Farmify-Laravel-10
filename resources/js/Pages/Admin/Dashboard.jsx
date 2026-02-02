import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Users, ShoppingCart, DollarSign } from 'lucide-react'
import AdminLayout from '@/Layouts/AdminLayout'
import { usePage } from '@inertiajs/react'

export default function Dashboard() {
    const { stats } = usePage().props
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2 sm:mt-0">
          Welcome back! Here's an overview of your platform metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Users</CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.users ?? 0}
            </p>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Total registered users
            </CardDescription>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Orders</CardTitle>
            <ShoppingCart className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.orders ?? 0}
            </p>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Orders processed today
            </CardDescription>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
            <DollarSign className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              ${stats?.revenue?.toLocaleString() ?? 0}
            </p>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Revenue this month
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for additional sections */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest registered users on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Replace with a dynamic table or list */}
            <p className="text-gray-500">Coming soon...</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track the most recent orders</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Replace with a dynamic table or list */}
            <p className="text-gray-500">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
