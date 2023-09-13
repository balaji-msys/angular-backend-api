const express = require("express");
const Book = require("../models/team_c_models/Books.model");
const User = require("../models/team_c_models/Users.model");
const router = express.Router();
const createError = require("http-errors");
router.get("/", (req, res) => {
  const teamAData = {
    team: "Team C",
    message: "Welcome to Team C endpoint!",
  };
  res.json(teamAData);
});
router.get("/books", async function (req, res) {
  const book = await Book.find().populate();
  res.json(book);
});
router.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.json(book);
});

router.get("/get-cartItem/:id", async (req, res, next) => {
  try {
    let book;
    if (req.params.id) {
      book = await User.findById(req.params.id).populate({
        path: "cartItem",
        populate: "book",
      });
    } else {
      throw createError.Conflict(`Something went wrong!!!`);
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

router.patch("/add-cartItem/:id", async (req, res, next) => {
  try {
    let book;
    const { id, quantity } = req.body;
    if (req.params.id) {
      book = await User.findById(req.params.id);
      book.cartItem.push({ book: id, quantity });
      await book.save();
    } else {
      throw createError.Conflict(`Something went wrong!!!`);
    }
    const suser = await User.findById(req.params.id).populate({
      path: "cartItem",
      populate: "book",
    });
    res.send(suser);
  } catch (error) {
    next(error);
  }
});

router.patch("/cartItem-qty/:id", async (req, res) => {
  const { id, quantity } = req.body;
  const user = await User.findById(req.params.id);
  const cart = user.cartItem.find((item) => item._id.toString() === id);
  cart.quantity = quantity || 1;
  await user.save();
  const suser = await User.findById(req.params.id).populate({
    path: "cartItem",
    populate: "book",
  });
  res.send(suser);
});

router.patch("/remove-cartItem/:id", async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const { _id } = req.body;
  user.cartItem.pull({
    _id,
  });
  await user.save();
  const suser = await User.findById(req.params.id).populate({
    path: "cartItem",
    populate: "book",
  });
  res.send(suser);
});
router.get("/users", async function (req, res) {
  const user = await User.find().populate({
    path: "cartItem",
    populate: "book",
  });
  res.json(user);
});

router.get("/users/:id", async function (req, res) {
  const user = await User.findById(req.params.id).populate({
    path: "cartItem",
    populate: "book",
  });
  res.json(user);
});

router.post("/user/signup", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist)
      throw createError.Conflict(`${email} is already registered.`);
    const user = new User({
      name,
      email,
      password,
      cartItem: [],
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/user/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError.Conflict(`User not found`);

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      throw createError.Unauthorized("Invalid Username/Password");

    res.json({
      _id: user.id,
      name: user.name,
      cartItem: user.cartItem,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
