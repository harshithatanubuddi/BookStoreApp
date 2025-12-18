import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const checkout = async () => {
  try {
    await axiosInstance.post("/cart/checkout", {
      items: cart.map(item => ({
        bookId: item._id,
        quantity: item.quantity,
      })),
    });

    alert("Order placed successfully");
    clearCart();
  } catch (err) {
    alert(err.response.data.message);
  }
};
<button
  onClick={checkout}
  className="bg-green-600 text-white px-4 py-2 rounded mt-4"
>
  Checkout
</button>

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>₹{item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">Total: ₹{total}</h2>

      {/* ✅ FIXED CLEAR CART */}
      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        
      )}
    </div>
  );
}

export default Cart;
