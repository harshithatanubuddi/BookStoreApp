import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    isbn: { type: String, required: true, unique: true },

    examType: {
      type: String,
      enum: ["GATE"],
      default: "GATE"
    },

    branch: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "CE", "CH", "BT"],
      required: true
    },

    subject: { type: String, required: true },
    image: { type: String },

    publisher: { type: String },
    publicationYear: { type: Number },

    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    reorderLevel: { type: Number, default: 5 }
  },
  { timestamps: true }
);

// useful indexes for analytics & filters
BookSchema.index({ branch: 1, subject: 1 });
BookSchema.index({ stockQuantity: 1 });

export default mongoose.model("Book", BookSchema);
