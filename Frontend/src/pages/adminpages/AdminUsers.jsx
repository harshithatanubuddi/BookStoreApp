import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/users").then(res => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {users.map(user => (
        <div key={user._id} className="border-b py-2">
          {user.fullname} — {user.email} ({user.role})
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
