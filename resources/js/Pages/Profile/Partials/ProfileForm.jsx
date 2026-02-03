import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfileForm({ user }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
  })

  const submit = (e) => {
    e.preventDefault()
    patch(route('profile.update'))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={submit} className="max-w-lg space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={data.email} disabled />
            <p className="text-xs text-muted-foreground">
              Email changes require verification
            </p>
          </div>

          <div className="pt-4">
            <Button disabled={processing}>
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
