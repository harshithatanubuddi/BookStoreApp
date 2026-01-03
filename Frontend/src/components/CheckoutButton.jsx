import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";

function CheckoutButton() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      await axiosInstance.post("/order/checkout", {
        items: cart.map(item => ({
          bookId: item._id,
          quantity: item.quantity,
        })),
      },
      {
          withCredentials: true, // REQUIRED FOR RENDER
      }
      );

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || cart.length === 0}
      className={`mt-6 px-6 py-3 rounded text-white ${
        loading || cart.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
}

export default CheckoutButton;
