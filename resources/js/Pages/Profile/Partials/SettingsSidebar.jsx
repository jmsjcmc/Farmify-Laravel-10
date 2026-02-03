import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { User, Shield } from 'lucide-react'

export default function SettingsSidebar() {
  const { url } = usePage()

  const linkClass = (href) =>
    clsx(
      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition',
      url.startsWith(href)
        ? 'bg-muted text-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    )

  return (
    <aside className="space-y-2">
      <Link href="/profile/settings" className={linkClass('/profile')}>
        <User className="w-4 h-4" />
        Profile
      </Link>

      <Link href="/profile/security" className={linkClass('/profile/security')}>
        <Shield className="w-4 h-4" />
        Security
      </Link>
    </aside>
  )
}
