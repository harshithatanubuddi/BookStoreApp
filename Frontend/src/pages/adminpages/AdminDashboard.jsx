import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/books" className="p-6 border rounded-lg">
          📚 Manage Books
        </Link>

        <Link to="/admin/users" className="p-6 border rounded-lg">
          👥 Manage Users
        </Link>

        <Link to="/admin/create-book" className="p-6 border rounded-lg">
          ➕ Add New Book
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
