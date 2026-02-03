import { useState } from "react"
import { router } from "@inertiajs/react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"

import {
  MoreHorizontal,
  Edit,
  User,
  Settings,
  UserX,
} from "lucide-react"

export default function UserActions({ user }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDeactivate, setOpenDeactivate] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setLoading(true)

    router.put(`/admin/users/${user.id}`, formData, {
      onSuccess: () => setOpenEdit(false),
      onFinish: () => setLoading(false),
    })
  }

  const handleDeactivate = () => {
    setLoading(true)

    router.patch(`/admin/users/${user.id}/deactivate`, {}, {
      onSuccess: () => setOpenDeactivate(false),
      onFinish: () => setLoading(false),
    })
  }

  return (
    <>
      {/* Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User Actions">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={() => setOpenEdit(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Edit className="w-4 h-4 text-blue-600" />
            Edit User
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4 text-green-600" />
            Manage Roles
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="w-4 h-4 text-gray-600" />
            View Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Destructive Action */}
          <DropdownMenuItem
            onClick={() => setOpenDeactivate(true)}
            className="flex items-center gap-2 text-red-600 cursor-pointer focus:text-red-600"
          >
            <UserX className="w-4 h-4" />
            Deactivate User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirmation Dialog */}
      <Dialog open={openDeactivate} onOpenChange={setOpenDeactivate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Deactivate User
            </DialogTitle>
            <DialogDescription>
              This user will no longer be able to log in or access the system.
              You can reactivate them later if needed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              onClick={handleDeactivate}
              disabled={loading}
            >
              {loading ? "Deactivating..." : "Deactivate User"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenDeactivate(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
