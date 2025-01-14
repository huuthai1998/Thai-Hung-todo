var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("./config/morganMiddleware");
require("dotenv").config();

var todoRouter = require("./routes/todo");
var userRouter = require("./routes/user");
var indexRouter = require("./routes/index");

var app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var cors = require("cors");

app.use(cors());
app.use("/", indexRouter);
app.use("/todo", todoRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
