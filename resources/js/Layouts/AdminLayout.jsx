export default function AdminLayout({ children }) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <aside className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-lg font-bold">Admin</h2>
        </aside>

        <main className="flex-1 p-6">{ children }</main>
      </div>
    )
}
