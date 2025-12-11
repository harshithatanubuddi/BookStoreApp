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
          Discover Your Next Favorite Book
          <span className="text-orange-600"> Today!</span>
        </h1>

        <p className="mt-4 sm:mt-6 
                      text-gray-700 dark:text-gray-300 
                      text-sm sm:text-base md:text-lg lg:text-xl max-w-md">
          Explore thousands of books from all genres. Sign up for updates, new arrivals, and exclusive offers!
        </p>

        {/* Email Subscription */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 
                        w-full sm:w-auto justify-center md:justify-start items-center">

          <label className="flex items-center w-full sm:w-auto 
                            border border-gray-300 dark:border-gray-600 
                            rounded-lg px-4 py-2 
                            bg-white dark:bg-slate-800 
                            focus-within:ring-2 focus-within:ring-orange-400">

            <svg className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="outline-none w-full text-sm sm:text-base 
                         bg-transparent 
                         text-gray-800 dark:text-white"
            />
          </label>

          <button className="bg-orange-600 text-white px-6 py-2 sm:py-3 
                             rounded-lg hover:bg-orange-500 
                             transition duration-300 font-semibold 
                             text-sm sm:text-base">
            Subscribe
          </button>
        </div>

        {/* Call to Action */}
        <div className="mt-4 sm:mt-6">
          <button className="bg-gray-900 dark:bg-gray-700 
                             text-white px-6 sm:px-8 py-2 sm:py-3 
                             rounded-lg 
                             hover:bg-gray-800 dark:hover:bg-gray-600 
                             transition duration-300 font-semibold 
                             text-sm sm:text-base">
            Explore Books
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
