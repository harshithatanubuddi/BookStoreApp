import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../utils/axiosInstance";

function Freebook() {
  const [book, setBook] = useState([]);
  
  useEffect(() => {
    const fetchHomeBooks = async () => {
      try {
        const res = await axios.get("https://bookstoreapp-backend-ynkn.onrender.com/book/stats/top-by-branch");

        setBook(Array.isArray(res.data.books) ? res.data.books : []);
      } catch (err) {
        console.error("Error loading Home books:", err);
        setBook([]);
      }
    };

    fetchHomeBooks();
  }, []);

  const filterData = book; // already filtered by backend

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="
      w-full mt-20 py-16 
      bg-gradient-to-b from-gray-50 to-white
      dark:from-slate-900 dark:to-slate-900
    ">

      <div className="text-center mb-10">
        {/* <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          <span className="text-orange-600">Free</span> Courses for You 🎁
        </h1> */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          GATE Books by Branch
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base max-w-xl mx-auto">
          Explore branch-wise GATE preparation books based on inventory insights.
        </p>

        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base max-w-xl mx-auto">
          Select your engineering branch to explore relevant GATE preparation books.
        </p>
      </div>

      <div
        className="
          max-w-screen-2xl container mx-auto md:px-20 px-6
          bg-gray-50 dark:bg-slate-900
          py-12
        "
      >
        <div
          className="
            bg-white dark:bg-slate-800
            rounded-xl shadow-lg
            p-6 md:p-10
          "
        >
          {/* <Slider {...settings}>
            {filterData.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </Slider> */}
          {book.length > 0 ? (
              book.map((item) => (
                <Card key={item._id} item={item} />
              ))
            ) : (
              <p>No books available</p>
            )}
          <Slider {...settings}>
            

            {book.map((item) => (
              <div
              key={item._id}
              className="
                p-6 rounded-xl text-center cursor-pointer
                bg-gray-50 dark:bg-slate-700
                border border-gray-200 dark:border-slate-600
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              "
              onClick={() => window.location.href = `/courses?branch=${item._id}`}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {item._id}
              </h2>

              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📚 Total Books: <span className="font-semibold">{item.bookCount}</span>
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📦 Total Stock: <span className="font-semibold">{item.totalStock}</span>
                </p>
              </div>

              <p className="mt-4 text-sm text-orange-600 font-semibold">
                View Books →
              </p>
            </div>
            ))}
          </Slider>

        </div>
      </div>

    </div>
  );
}

export default Freebook;
