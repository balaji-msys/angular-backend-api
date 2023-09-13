const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { genSalt, hash, compare } = bcrypt;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  cartItem: [
    {
      quantity: Number,
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    },
  ],
});


UserSchema.methods.isValidPassword = async function (password) {
  try {
    return password === this.password;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
