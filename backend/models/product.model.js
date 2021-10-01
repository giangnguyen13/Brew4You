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
    productId: { type: String, unique: true, required: true },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
    name: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    // // do we need this?
    // category: {
    //   type: String,
    //   required: true,
    // },
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
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
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
