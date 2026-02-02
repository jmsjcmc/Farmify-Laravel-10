import { Menu } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { LogIn, LogOut, Settings, User, UserPlus } from 'lucide-react';

export default function Navbar({ user }) {
    const isAuth = Boolean(user?.id)
    return (
        <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo / Brand */}
            <Link href="/">
                <h1 className="text-2xl font-bold text-[#1B4332]">Farmify</h1>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/consumer"
                    className="text-[#2D3436] hover:text-[#1B4332] font-medium"
                >
                    Marketplace
                </Link>
                <Link
                    href="/jobs"
                    className="text-[#2D3436] hover:text-[#1B4332] font-medium"
                >
                    Jobs
                </Link>
                <Link
                    href="/about"
                    className="text-[#2D3436] hover:text-[#1B4332] font-medium"
                >
                    About
                </Link>
            </div>

            {/* User Dropdown */}
            <div>
                  <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {isAuth ? user.name : 'Account'}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                    {isAuth ? (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2 text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/login" className="flex items-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <Link href="/register" className="flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    Register
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </nav>
    );
}
