import Book from "../model/book_model.js";

export const getBooks = async (req, res) => {
  try {
    const { page, category } = req.query;  // Get filters from URL
    let filter = {};

    if (page) filter.page = page;          // Filter by page (Home / Course)
    if (category) filter.category = category; // For Freebook page

    const bookf = await Book.find(filter); // Apply filters
    res.status(200).json(bookf);

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
