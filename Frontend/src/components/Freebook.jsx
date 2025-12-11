import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import Cards from "./cards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Freebook() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/list.json")
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("Error loading list.json:", err));
  }, []);

  const filterData = list.filter((item) => item.category === "Free");

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

      {/* Section Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          <span className="text-orange-600">Free</span> Courses for You 🎁
        </h1>

        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>

        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base max-w-xl mx-auto">
          Unlock our premium-quality free courses and start learning instantly.
        </p>
      </div>

      {/* ✅ Slider with full dark theme matching UI */}
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
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </div>

    </div>
  );
}

export default Freebook;
