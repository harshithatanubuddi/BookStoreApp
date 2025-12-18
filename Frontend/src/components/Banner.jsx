import React from 'react';

function Banner() {
  return (
    <div className='max-w-screen-2xl container mx-auto px-4 md:px-20 
                    flex flex-col md:flex-row items-center py-12
                    bg-gray-50 dark:bg-slate-900'>

      {/* Right Section - Banner Image */}
      <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-8 md:mb-0">
        <img
          src="/bookimg.jpg"
          alt="Books Banner"
          className="w-64 sm:w-72 md:w-80 lg:w-[400px] h-auto rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Left Section - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center 
                      md:items-start text-center md:text-left 
                      order-2 md:order-1">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                       font-extrabold 
                       text-gray-900 dark:text-white 
                       leading-snug sm:leading-tight md:leading-tight">
          Prepare Smarter for GATE Exams
          <span className="text-orange-600"> with the Right Books</span>

        </h1>

        <p className="mt-4 sm:mt-6 
                      text-gray-700 dark:text-gray-300 
                      text-sm sm:text-base md:text-lg lg:text-xl max-w-md">
          Browse branch-wise GATE preparation books for CSE, ECE, ME, and more — curated for serious exam aspirants.
        </p>

        <div className="mt-6">
          <button
            onClick={() => window.location.href = "/courses"}
            className="bg-gray-900 dark:bg-gray-700 
                      text-white px-6 sm:px-8 py-2 sm:py-3 
                      rounded-lg 
                      hover:bg-gray-800 dark:hover:bg-gray-600 
                      transition duration-300 font-semibold 
                      text-sm sm:text-base">
            Explore GATE Books
          </button>
        </div>

        {/* Promo Text */}
        <p className="mt-3 sm:mt-4 
                      text-xs sm:text-sm 
                      text-gray-500 dark:text-gray-400 
                      italic max-w-xs md:max-w-md">
          Free shipping on orders over $50. Discover new arrivals every week!
        </p>

      </div>

    </div>
  );
}

export default Banner;
