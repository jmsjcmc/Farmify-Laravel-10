const { default: AdminLayout } = require("@/Layouts/AdminLayout")

function Dashboard() {
    return <h1 className="text-2xl font-bold">Admin Dashboard</h1>
}

Dashboard.layout = page => <AdminLayout>{ page }</AdminLayout>

export default Dashboard;
