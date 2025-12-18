import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function AdminBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axiosInstance.get("/book");
    setBooks(res.data.books);
  };

  const deleteBook = async (id) => {
    await axiosInstance.delete(`/book/delete/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Books</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Branch</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.branch}</td>
              <td>₹{book.price}</td>
              <td>
                <button className="mr-2">Edit</button>
                <button
                  onClick={() => deleteBook(book._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBooks;
