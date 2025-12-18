import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function AdminStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axiosInstance.get("/book/top-by-branch")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map(item => (
        <div
          key={item._id}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-bold">{item._id}</h2>
          <p>Total Books: {item.bookCount}</p>
          <p>Total Stock: {item.totalStock}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;
