import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Cards from "../components/Cards";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);

  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const inCart = book
    ? cart.some((item) => item._id === book._id)
    : false;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/book/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await axios.get(
        `/book/${id}/related`
      );
      setRelated(res.data);
    };

    fetchRelated();
  }, [id]);


  if (!book) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const handleAddToCart = async () => {
  try {
    // 🔐 Backend stock validation
    await axiosInstance.get(`/book/check-stock/${book._id}`);

    addToCart(book);
  } catch (err) {
    alert(err.response?.data?.message || "Out of stock");
  }
};


  return (
  <div className="max-w-screen-lg mx-auto mt-24 px-4">

    <Link to="/courses" className="text-orange-500 underline">
      ← Back to Books
    </Link>

    <div className="grid md:grid-cols-2 gap-10 mt-8">

      {/* Image */}
      <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-6 flex justify-center">
        <img
          src={book.image || "/placeholder-book.png"}
          alt={book.title}
          className="max-h-96 object-contain"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold">{book.title}</h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          by {book.author}
        </p>

        <p className="mt-4">
          <strong>Branch:</strong> {book.branch}
        </p>

        <p>
          <strong>Subject:</strong> {book.subject}
        </p>

        <p className="mt-4 text-xl font-semibold text-green-600">
          ₹{book.price}
        </p>

        <p className="mt-2">
          {book.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {inCart ? (
  <div className="flex gap-4 mt-6">
    <button
      disabled
      className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold cursor-default"
    >
      ✔ In Cart
    </button>

    <button
      onClick={() => navigate("/cart")}
      className="px-6 py-2 rounded-lg border border-orange-500 text-orange-500
                 hover:bg-orange-500 hover:text-white transition"
    >
      Go to Cart →
    </button>
  </div>
) : (
  <button
  onClick={handleAddToCart}
  disabled={book.stockQuantity <= 0}
  className={`mt-6 px-6 py-2 rounded-lg text-white ${
    book.stockQuantity <= 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {book.stockQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
</button>
)}


      </div>
    </div>

    {/* ✅ RELATED BOOKS (CORRECT PLACE) */}
    {related.length > 0 && (
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">
          Related Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    )}
    

  </div>
);
}

export default BookDetails;
