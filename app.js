var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors')


dotenv.config();
const teamARoute = require("./routes/team-a");
const teamBRoute = require("./routes/team-b");
const teamCRoute = require("./routes/team-c");
const teamDRoute = require("./routes/team-d");
const teamERoute = require("./routes/team-e");
const connectDb = require("./config/connectdb");

var app = express();

connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/team-a", teamARoute);
app.use("/team-b", teamBRoute);
app.use("/team-c", teamCRoute);
app.use("/team-d", teamDRoute);
app.use("/team-e", teamERoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  req.app.get("env") === "development"
    ? res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      })
    : res.send("something went wrong");
});

module.exports = app;
