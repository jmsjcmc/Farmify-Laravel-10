import { useState } from 'react'
import { router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Search } from 'lucide-react'
import UserActions from './Partials/UserAction'
import PaginationLinks from '@/Components/Pagination'

export default function Users({ users, filters }) {
  const [search, setSearch] = useState(filters.search || '')

  // Add User Dialog
  const [addOpen, setAddOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: [],
  })

  const handleSearch = (e) => {
    e.preventDefault()
    router.put(route('admin.users.index'), { search }, { preserveState: true, replace: true })
  }

  const handleAddChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    setLoading(true)
    Inertia.post(route('admin.users.store'), formData, {
      onSuccess: () => {
        setAddOpen(false)
        setFormData({ name: '', email: '', password: '', roles: [] })
      },
      onFinish: () => setLoading(false),
    })
  }

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

        <div className="flex gap-2 items-center">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-8"
            />
          </form>

          {/* Add User Button */}
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <Button onClick={() => setAddOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleAddChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleAddChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
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
                    {loading ? 'Creating...' : 'Create User'}
                  </Button>
                  <Button variant="outline" onClick={() => setAddOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40 sticky top-0 z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.data.length ? (
              users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {user.roles.length ? (
                        user.roles.map((role) => (
                          <Badge
                            key={role.id}
                            variant={role.name === 'admin' ? 'destructive' : 'secondary'}
                          >
                            {role.name}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline">No role</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end">
        <PaginationLinks links={users.links} />
      </div>
    </AdminLayout>
  )
}
