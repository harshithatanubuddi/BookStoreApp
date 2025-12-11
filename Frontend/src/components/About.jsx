import React from "react";

function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 
                      shadow-lg rounded-lg p-8 border 
                      border-gray-300 dark:border-gray-700">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          About Us
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">
          Welcome to our platform! We are committed to providing high-quality 
          courses, resources, and support to learners around the globe.
          <br /><br />
          Our team works continuously to deliver the best educational experience 
          through modern technology, expert instructors, and a seamless user interface.
        </p>

      </div>
    </div>
  );
}

export default About;
