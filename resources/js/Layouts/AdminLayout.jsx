import { Link, usePage } from '@inertiajs/react'
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }) {
    const { url, props } = usePage()
    const user = props.auth?.user

    const navItems = [
        {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            label: 'Users',
            href: '/admin/users',
            icon: Users,
        },
    ]

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="sticky top-0 h-screen w-64 bg-white border-r">
                <div className="flex flex-col h-full px-6 py-6">
                    {/* Brand */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-[#1B4332]">
                            Farmify Admin
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            System Control Panel
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {navItems.map(({ label, href, icon: Icon }) => {
                            const active = url.startsWith(href)

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                                        active
                                            ? 'bg-[#1B4332] text-white'
                                            : 'text-muted-foreground hover:bg-muted'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Admin Footer */}
                    <div className="border-t pt-4">
                        <div className="mb-3">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">
                                Administrator
                            </p>
                        </div>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    )
}
