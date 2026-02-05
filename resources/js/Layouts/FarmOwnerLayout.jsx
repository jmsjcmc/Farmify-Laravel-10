import { Link, usePage } from "@inertiajs/react"
import {
  LayoutDashboard,
  Leaf,
  Map,
  Boxes,
  Users,
  Briefcase,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/Components/ui/sheet"
import { Separator } from "@/Components/ui/separator"

const navItems = [
  { label: "Dashboard", href: "/farm-owner/dashboard", icon: LayoutDashboard },
  { label: "Farm Profile", href: "/farm-owner/farm", icon: Leaf },
  { label: "Plots & Areas", href: "/farm-owner/plots", icon: Map },
  { label: "Inventory", href: "/farm-owner/inventory", icon: Boxes },
  { label: "Team", href: "/farm-owner/team", icon: Users },
  { label: "Job Posts", href: "/farm-owner/jobs", icon: Briefcase },
  { label: "Reports", href: "/farm-owner/reports", icon: BarChart3 },
]

function isActiveRoute(currentUrl, href) {
  return currentUrl === href || currentUrl.startsWith(`${href}/`)
}

function Sidebar({ url, user }) {
  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActiveRoute(url, href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${
                  active
                    ? "bg-[#1B4332]/10 text-[#1B4332]"
                    : "text-muted-foreground hover:bg-muted"
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-4 py-4 border-t">
        <div className="mb-3">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground">Farm Owner</p>
        </div>

        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 transition rounded-lg hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Link>
      </div>
    </div>
  )
}

export default function FarmOwnerLayout({ children }) {
  const { url, props } = usePage()
  const user = props.auth?.user

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="flex-col hidden w-64 bg-white border-r md:flex">
        <div className="h-16 flex items-center px-6 font-bold text-lg text-[#1B4332]">
          🌾 Farm Owner
        </div>

        <Sidebar url={url} user={user} />
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-64 p-0">
                <div className="h-16 flex items-center px-6 font-bold text-lg text-[#1B4332]">
                  🌾 Farm Owner
                </div>
                <Separator />
                <Sidebar url={url} user={user} />
              </SheetContent>
            </Sheet>

            <span className="text-sm text-muted-foreground">
              Owner Dashboard
            </span>
          </div>

          {/* Future actions: notifications, quick add */}
          <div className="flex items-center gap-2" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
