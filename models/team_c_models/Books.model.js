const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  status: {
    type: String,
  },
  authors: {
    type: [String],
  },
  categories: {
    type: [String],
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
});
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
