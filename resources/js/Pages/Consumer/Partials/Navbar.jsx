import { Link, usePage } from "@inertiajs/react";
import {
    ShoppingCart,
    User,
    Settings,
    LogOut,
    LogIn,
    UserPlus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar({ user, isGuest }) {
  const { totalItems } = useCart()
  const { url } = usePage()

  const navLink = (href) =>
    clsx(
      "relative px-1 text-sm font-medium transition-colors",
      url.startsWith(href)
        ? "text-[#1B4332] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#1B4332]"
        : "text-[#2D3436] hover:text-[#1B4332]"
    )

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-[#1B4332]">
          Farmify
        </Link>

        {/* Main Nav */}
        <div className="items-center hidden gap-6 md:flex">
          <Link href="/consumer/ecommerce" className={navLink("/consumer/ecommerce")}>
            Marketplace
          </Link>

          <Link href={route("job-find")} className={navLink("/jobs")}>
            Jobs
          </Link>

          <Link href="/about" className={navLink("/about")}>
            About
          </Link>

          {!isGuest && (
            <Link
              href={route("farm-owner.apply")}
              className="font-medium text-[#1B4332]"
            >
              Start Selling
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <CartDrawer disabled={isGuest}>
            <button
              className="relative p-2 rounded-md hover:bg-muted"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {!isGuest && totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </button>
          </CartDrawer>

          {/* Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isGuest ? "Account" : user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {isGuest ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={route("profile.settings")}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/logout" method="post" as="button">
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
