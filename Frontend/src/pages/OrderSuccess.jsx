import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-32 text-center px-4">
      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully
      </h1>

      <p className="mt-4 text-gray-600">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/my-orders")}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg
                     hover:bg-orange-600 transition"
        >
          Go to My Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 border border-gray-400 rounded-lg
                     hover:bg-gray-100 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
