import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get("/orders/my-orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  if (orders.length === 0) {
    return <p className="p-6">No orders found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map(order => (
        <div key={order._id} className="border rounded p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">
              Order ID: {order._id.slice(-6)}
            </span>
            <span className="text-green-600 font-bold">
              ₹{order.totalAmount}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Status: {order.status}
          </p>

          <div className="mt-3">
            {order.items.map(item => (
              <div
                key={item._id}
                className="flex items-center gap-3 mb-2"
              >
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.book.title}</p>
                  <p className="text-sm">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
