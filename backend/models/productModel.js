const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: String, required: true },
    productImage: { type: String, required: true },
    postDate: { type: Date, default: Date.now },
    users: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: String,
    userImage: String,
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
