import mongoose from "mongoose";
import Book from "../model/book_model.js";
import Order from "../model/order_model.js";

/*
POST /order/checkout
BODY:
{
  items: [
    { bookId: "...", quantity: 1 }
  ]
}
*/
export const checkout = async (req, res) => {
  const { items } = req.body;

  // Validate BEFORE transaction
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;
    let totalAmount = 0;
    const orderItems = [];

    // Atomic stock check + decrement
    for (const item of items) {
      const book = await Book.findOneAndUpdate(
        {
          _id: item.bookId,
          stockQuantity: { $gte: item.quantity },
        },
        {
          $inc: { stockQuantity: -item.quantity },
        },
        { new: true, session }
      );

      if (!book) {
        throw new Error("Book out of stock");
      }

      totalAmount += book.price * item.quantity;

      orderItems.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });
    }

    const [order] = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          totalAmount,
          status: "CONFIRMED",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Checkout successful",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: error.message || "Checkout failed",
    });
  }
};

export const getMyOrders1 = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.book", "title image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json(order);
};

/* ADMIN – GET ALL ORDERS */
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "email fullname")
    .populate("items.book", "title");

  res.json(orders);
};

/* ADMIN – CANCEL ORDER + RESTORE STOCK */
export const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (["SHIPPED", "DELIVERED"].includes(order.status)) {
  return res.status(400).json({ message: "Cannot cancel shipped order" });
}

  if (order.status === "CANCELLED") {
    return res.status(400).json({ message: "Order already cancelled" });
  }

  for (const item of order.items) {
    await Book.findByIdAndUpdate(item.book, {
      $inc: { stockQuantity: item.quantity },
    });
  }

  order.status = "CANCELLED";
  await order.save();

  res.json({ message: "Order cancelled & stock restored" });
  
};
