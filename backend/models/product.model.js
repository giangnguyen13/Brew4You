import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImageThumbnails: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    productAttributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductAttribute",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
