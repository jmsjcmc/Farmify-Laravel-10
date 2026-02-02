import { Menu } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

export default function Navbar({ user }) {
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
                        <Button variant="outline" className="capitalize">
                            {user.name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link href="/profile">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/logout" method="post" as="button">
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
