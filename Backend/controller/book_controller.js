import Book from "../model/book_model.js";

/* ================= GET BOOKS ================= */
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { branch, subject, search } = req.query;

    // 🔍 Build filter dynamically
    const query = {};

    if (branch) query.branch = branch;
    if (subject) query.subject = subject;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments(query);

    res.status(200).json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};


/* ================= GET BOOK BY ID ================= */
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

/* ================= RELATED BOOKS ================= */
export const getRelatedBooks = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const related = await Book.find({
    _id: { $ne: book._id },
    branch: book.branch,
    subject: book.subject,
  }).limit(4);

  res.json(related);
};

/* ================= ADMIN CRUD ================= */
export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};

/* ================= HOME STATS ================= */
export const topBooksByBranch = async (req, res) => {
  try {
    const data = await Book.aggregate([
      {
        $group: {
          _id: "$branch",
          bookCount: { $sum: 1 },
          totalStock: { $sum: "$stockQuantity" }
        }
      },
      { $sort: { bookCount: -1 } }
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

export const checkStock = async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId).select("stockQuantity");

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.stockQuantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  res.json({ inStock: true });
};
