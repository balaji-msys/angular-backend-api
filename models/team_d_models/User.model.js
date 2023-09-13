const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { genSalt, hash, compare } = bcrypt;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
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
  isAdmin: {
    type: Boolean,
  },
  cartItem: [
    {
      quantity: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

// UserSchema.pre("save", async function (next) {
//   try {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//     next();
//   } catch (e) {
//     next(e);
//   }
// });

UserSchema.methods.isValidPassword = async function (password) {
  try {
    // return await compare(password, this.password);
    return password === this.password;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
