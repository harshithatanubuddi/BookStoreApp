import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function Admin() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    branch: "",
    subject: "",
    price: "",
    stockQuantity: "",
    image: "",
  });

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
  try {
    const res = await axiosInstance.get(`/book?page=${page}&limit=10`);
    setBooks(res.data.books);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
  fetchBooks();
  }, [page]);


  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= OPEN MODALS ================= */
  const openAddModal = () => {
    setEditingBook(null);
    setForm({
      title: "",
      author: "",
      isbn: "",
      branch: "",
      subject: "",
      price: "",
      stockQuantity: "",
      image: "",
    });
    setOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book._id);
    setForm({
      title: book.title || "",
      author: book.author || "",
      isbn: book.isbn || "",
      branch: book.branch || "",
      subject: book.subject || "",
      price: book.price || "",
      stockQuantity: book.stockQuantity || "",
      image: book.image || "",
    });
    setOpen(true);
  };

  /* ================= SAVE (ADD / UPDATE) ================= */
  const saveBook = async () => {
  if (!form.title || !form.author || !form.isbn || !form.price) {
    return alert("Please fill all required fields");
  }

  const payload = {
    title: form.title.trim(),
    author: form.author.trim(),
    isbn: form.isbn.trim(),
    branch: form.branch.trim(),
    subject: form.subject.trim(),
    price: Number(form.price),
    stockQuantity: Number(form.stockQuantity),
    image: form.image.trim(),
  };

  try {
    if (editingBook) {
      await axiosInstance.put(`/book/update/${editingBook}`, payload);
    } else {
      await axiosInstance.post("/book/create", payload);
    }

    setOpen(false);
    setEditingBook(null);
    await fetchBooks(); // ✅ DATABASE IS SOURCE OF TRUTH

  } catch (err) {
    alert(err.response?.data?.message || "Failed to save book");
  }
};


  /* ================= DELETE ================= */
  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axiosInstance.delete(`/book/delete/${id}`);
      fetchBooks();
    } catch (err) {
      alert("Failed to delete book");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin – Manage Books</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={openAddModal}
        >
          + Add Book
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">
              {editingBook ? "Edit Book" : "Add Book"}
            </h2>

            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border w-full mb-2 p-2" />
            <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="border w-full mb-2 p-2" />
            <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN (Required)" className="border w-full mb-2 p-2" />
            <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" className="border w-full mb-2 p-2" />
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="border w-full mb-2 p-2" />
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border w-full mb-2 p-2" />
            <input type="number" name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock Quantity" className="border w-full mb-2 p-2" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border w-full mb-2 p-2" />

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                className="bg-orange-500 text-white px-3 py-1 rounded"
                onClick={saveBook}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 dark:bg-slate-700">
            <th className="p-2">Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-t">
              <td className="p-2">{book.title}</td>
              <td>₹{book.price}</td>
              <td>{book.stockQuantity}</td>
              <td className="flex gap-2">
                <button onClick={() => openEditModal(book)} className="text-blue-500">
                  Edit
                </button>
                <button onClick={() => deleteBook(book._id)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(prev => prev - 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-4 py-2">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(prev => prev + 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
}

export default Admin;
