import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["PLACED", "CANCELLED", "DELIVERED"],
    default: "PLACED",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
