import Navbar from '@/Pages/Consumer/Partials/Navbar'
import { usePage } from '@inertiajs/react'

export default function ConsumerLayout({ children }) {
  const { auth } = usePage().props
  const user = auth?.user ?? null
  const isGuest = !user

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} isGuest={isGuest} />

      <main className="px-6 py-6 mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  )
}
