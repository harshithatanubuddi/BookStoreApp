import User from "../model/user_model.js";
import Book from "../model/book_model.js";

export const adminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalStock = await Book.aggregate([
      { $group: { _id: null, stock: { $sum: "$stockQuantity" } } }
    ]);

    res.status(200).json({
      totalUsers,
      totalBooks,
      totalStock: totalStock[0]?.stock || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Admin stats failed" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
