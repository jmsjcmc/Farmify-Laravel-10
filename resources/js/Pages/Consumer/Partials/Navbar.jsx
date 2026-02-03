import { Link, usePage } from '@inertiajs/react'
import { ShoppingCart, User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { useCart } from './CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar({ user }) {
  const isAuth = Boolean(user?.id)
  const { totalItems } = useCart()
  const { url } = usePage()

  const navLink = (href) =>
    clsx(
      'relative px-1 text-sm font-medium transition-colors',
      url.startsWith(href)
        ? 'text-[#1B4332] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#1B4332]'
        : 'text-[#2D3436] hover:text-[#1B4332]'
    )

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#1B4332]">
            Farmify
          </span>
        </Link>

        {/* Main Navigation */}
        <div className="items-center hidden gap-6 md:flex">
          <Link href="/consumer/ecommerce" className={navLink('/consumer/ecommerce')}>
            Marketplace
          </Link>
          <Link href="/jobs" className={navLink('/jobs')}>
            Jobs
          </Link>
          <Link href="/about" className={navLink('/about')}>
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <CartDrawer>
            <button
              className="relative p-2 transition rounded-md hover:bg-muted focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </button>
          </CartDrawer>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isAuth ? user.name : 'Account'}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {isAuth ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={route('profile.settings')} className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="flex items-center w-full gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/register" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Register
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
