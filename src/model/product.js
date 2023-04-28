const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);
const productSchema = new mongoose.Schema({
  product_name: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
  discription: { type: String },
  brand: { type: String },
  rating: { type: Number, default: 0 },
  countInStock: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Product", productSchema);
