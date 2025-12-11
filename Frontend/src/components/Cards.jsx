import React from "react";

function Cards({ item }) {
  return (
    <div className="p-3">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden 
                      hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                      border border-gray-100 
                      dark:bg-slate-800 dark:text-white dark:border-gray-700">
        
        {/* Image */}
        <figure className="h-48 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover hover:scale-105 transition duration-300"
          />
        </figure>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-bold flex justify-between items-center">
            {item.name}

            {/* Category Badge */}
            <span className="px-3 py-1 text-xs rounded-full 
                             bg-orange-100 text-orange-600 font-semibold
                             dark:bg-orange-900 dark:text-orange-300">
              {item.category}
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm dark:text-gray-300">
            {item.title}
          </p>

          <div className="flex justify-between items-center pt-2">
            {/* Price */}
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {item.price}
            </div>

            {/* Button */}
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full shadow 
                               hover:bg-orange-600 hover:shadow-md 
                               transition-all duration-200">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cards;
