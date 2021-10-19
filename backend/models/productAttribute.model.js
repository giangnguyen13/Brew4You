import mongoose from "mongoose";

const productAttributeSchema = mongoose.Schema(
  {
    displayText: {
      type: String,
      required: true,
    },
    dropdownValues: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ProductAttribute = mongoose.model(
  "ProductAttribute",
  productAttributeSchema
);

export default ProductAttribute;
