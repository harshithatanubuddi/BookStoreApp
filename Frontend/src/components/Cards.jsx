import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="p-3 cursor-pointer"
      onClick={() => navigate(`/books/${item._id}`)}
    >
      <div
        className="
          bg-white shadow-lg rounded-2xl overflow-hidden
          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
          border border-gray-100
          dark:bg-slate-800 dark:text-white dark:border-gray-700
          h-full flex flex-col
        "
      >
        {/* Image (FIXED HEIGHT ✅) */}
        <div className="w-full h-56 overflow-hidden bg-gray-100">
          <img
            src={item.image || "/placeholder-book.png"}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 flex flex-col flex-grow">
          
          {/* Title (FIXED HEIGHT ✅) */}
          <h2 className="text-base font-bold h-12 overflow-hidden">
            {item.title}
          </h2>

          {/* Author / Category (OPTIONAL INFO, FIXED HEIGHT) */}
          <p className="text-sm text-gray-600 dark:text-gray-300 h-10 overflow-hidden">
            {item.author}
          </p>

          {/* Push price + button to bottom */}
          <div className="mt-auto flex justify-between items-center pt-2">
            
            {/* Price */}
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              ₹{item.price}
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/books/${item._id}`)}
              className="
                px-4 py-2 bg-orange-500 text-white rounded-full
                hover:bg-orange-600 transition-all duration-200
              "
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
