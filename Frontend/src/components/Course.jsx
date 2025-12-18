import React, { useState, useEffect } from 'react';
import Cards from './Cards';
<<<<<<< HEAD
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> e44d56a5e35b07ef50c9cefef0127706e2cffc5f
import axios from 'axios';

function Course() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // ✅ Read from URL
  const initialBranch = searchParams.get("branch") || "ALL";
  const initialSubject = searchParams.get("subject") || "ALL";
  const initialPage = Number(searchParams.get("page")) || 1;

  const searchQuery = searchParams.get("search") || "";

  const [branch, setBranch] = useState(initialBranch);
  const [subject, setSubject] = useState(initialSubject);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [book, setBook] = useState([]);

  // ✅ Fetch books
  useEffect(() => {
    const getBook = async () => {
      try {
       const res = await axios.get("http://localhost:4001/book", {
        params: {
          branch: branch !== "ALL" ? branch : undefined,
          subject: subject !== "ALL" ? subject : undefined,
          search: searchQuery !== "ALL" ? searchQuery : undefined,
          page,
          limit: 16
        }
      });

        setBook(res.data.books || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getBook();
  }, [branch, subject, page, searchQuery]);

  // ✅ Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (branch !== "ALL") params.set("branch", branch);
    if (subject !== "ALL") params.set("subject", subject);
    if (page !== 1) params.set("page", page);

    navigate({ search: params.toString() }, { replace: true });
  }, [branch, subject, page, navigate]);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

      {/* Heading */}
      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          GATE Books <span className="text-orange-500">Collection</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Browse branch-wise and subject-wise GATE preparation books.
        </p>

        <Link to="/">
          <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mt-12 mb-10">
        <select
          value={branch}
          onChange={(e) => {
            setBranch(e.target.value);
            setSubject("ALL");
            setPage(1);
          }}
          className="px-4 py-2 border rounded-md 
                    bg-white text-black 
                    dark:bg-slate-800 dark:text-white dark:border-gray-600"
        >
                  <option value="ALL">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="EE">EE</option>
                </select>

                <select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-md 
                    bg-white text-black 
                    dark:bg-slate-800 dark:text-white dark:border-gray-600"
          >  
          <option value="ALL">All Subjects</option>


          {branch === "CSE" && (
            <>
              <option value="OS">OS</option>
              <option value="DBMS">DBMS</option>
              <option value="DSA">DSA</option>
              <option value="CN">CN</option>
            </>
          )}

          {branch === "ECE" && (
            <>
              <option value="Signals">Signals</option>
              <option value="Analog Circuits">Analog Circuits</option>
              <option value="Digital">Digital</option>
            </>
          )}

          {branch === "ME" && (
            <>
              <option value="Thermodynamics">Thermodynamics</option>
              <option value="SOM">SOM</option>
              <option value="FM">FM</option>
            </>
          )}

          {branch === "CE" && (
            <>
              <option value="Structural">Structural Analysis</option>
              <option value="Geotechnical">Geotechnical</option>
              <option value="Environmental">Environmental</option>
              <option value="Transportation">Transportation</option>
            </>
          )}

          {branch === "EE" && (
            <>
              <option value="Networks">Network Theory</option>
              <option value="Control">Control Systems</option>
              <option value="Machines">Electrical Machines</option>
              <option value="Power Systems">Power Systems</option>
            </>
          )}
        </select>
      </div>

      {/* Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {book.length > 0 ? (
          book.map((item) => <Cards key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No books found for selected filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}

export default Course;
