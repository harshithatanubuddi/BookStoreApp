import Book from "../model/book_model.js";

export const checkoutCart = async (req, res) => {
  try {
    const { items } = req.body;
    // items = [{ bookId, quantity }]

    for (const item of items) {
      const book = await Book.findById(item.bookId);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // 🔥 CORE STOCK VALIDATION
      if (book.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${book.title}`,
        });
      }
    }

    // If ALL items pass, then deduct stock
    for (const item of items) {
      await Book.findByIdAndUpdate(item.bookId, {
        $inc: { stockQuantity: -item.quantity },
      });
    }

    res.status(200).json({ message: "Checkout successful" });

  } catch (error) {
    res.status(500).json({ message: "Checkout failed" });
  }
};
