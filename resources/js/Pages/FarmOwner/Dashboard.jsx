import FarmOwnerLayout from "@/Layouts/FarmOwnerLayout"
import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"

export default function FarmOwnerDashboard() {
  return (
    <FarmOwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Farm Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your farm operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Plots" value="6" />
          <StatCard title="Inventory Items" value="128" />
          <StatCard title="Team Members" value="14" />
          <StatCard title="Monthly Revenue" value="₱124,500" />
        </div>

        {/* Verification Status */}
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-semibold">Verification Status</h3>
              <p className="text-sm text-muted-foreground">
                Farm documents review
              </p>
            </div>
            <Badge variant="outline">Approved</Badge>
          </CardContent>
        </Card>

        {/* Action Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ActionCard
            title="Daily Logs"
            description="Review reports submitted by your Farm Manager"
            action="Review Logs"
          />
          <ActionCard
            title="Marketplace Approval"
            description="Approve crops for public sale"
            action="Approve Listings"
          />
        </div>
      </div>
    </FarmOwnerLayout>
  )
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function ActionCard({ title, description, action }) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="outline">{action}</Button>
      </CardContent>
    </Card>
  )
}
