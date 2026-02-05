import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Search } from "lucide-react";
import UserActions from "./Partials/UserAction";
import PaginationLinks from "@/Components/Pagination";
import { ROLE_CONFIG } from "@/config/roles";

export default function Users({ users, filters }) {
    const isFirstRender = useRef(true);
    const [search, setSearch] = useState(filters.search || "");
    const [searching, setSearching] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        roles: [],
    });

    useEffect(() => {
    // Skip first render (prevents auto-loading on page load)
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    setSearching(true);

    const timeout = setTimeout(() => {
        router.get(
            route("admin.users.index"),
            { search },
            {
                replace: true,
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setSearching(false),
            }
        );
    }, 400);

    return () => clearTimeout(timeout);
}, [search]);


    const handleAddChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post(route("admin.users.store"), formData, {
            onSuccess: () => {
                setAddOpen(false);
                setFormData({ name: "", email: "", password: "", roles: [] });
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage platform users and their assigned roles.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="pl-8 pr-8"
                        />

                        {searching && (
                            <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    {/* Add User Button */}
                    <Dialog open={addOpen} onOpenChange={setAddOpen}>
                        <Button
                            onClick={() => setAddOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add User
                        </Button>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>

                            <form
                                onSubmit={handleAddUser}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleAddChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleAddChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleAddChange}
                                        required
                                    />
                                </div>

                                {/* Roles selection can be added later here if needed */}

                                <DialogFooter className="flex justify-end gap-2">
                                    <Button type="submit" disabled={loading}>
                                        {loading
                                            ? "Creating..."
                                            : "Create User"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setAddOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-muted/40">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.data.length ? (
                            users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.length ? (
                                                user.roles.map((role) => {
                                                    const config = ROLE_CONFIG[
                                                        role.name
                                                    ] ?? {
                                                        label: role.name,
                                                        variant: "outline",
                                                    };

                                                    return (
                                                        <Badge
                                                            key={role.id}
                                                            variant={
                                                                config.variant
                                                            }
                                                        >
                                                            {config.label}
                                                        </Badge>
                                                    );
                                                })
                                            ) : (
                                                <Badge variant="outline">
                                                    No role
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <UserActions user={user} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-12 text-center text-muted-foreground"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-6">
                <PaginationLinks links={users.links} />
            </div>
        </AdminLayout>
    );
}
