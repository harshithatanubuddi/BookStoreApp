import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Course() {

  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book?page=Course");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getBook();
  }, []);

  // const [list, setList] = React.useState([]);

  // React.useEffect(() => {
  //   fetch('/list2.json')
  //     .then((res) => res.json())
  //     .then((data) => setList(data));
  // }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 item-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're Delighted to have you
            <span className="text-orange-500"> Here :)</span>
          </h1>

          <p className="mt-12">Hi give some interesting matter for bookstore here</p>

          <Link to="/">
            <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-12 mb-12">
          {
            book.map((item) => (
              <Cards key={item._id} item={item} />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Course;
