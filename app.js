const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

// Middlewares
const corsHandler = require("./middlewares/cors.handler");
const errorHandler = require("./middlewares/error.handler");

// Express app
const app = express();

// Enable CORS Requests
app.use(cors({ origin: corsHandler.allowedOrigins, preflightContinue: true }));

// Register middlewares
app.use(logger("dev")); // HTTP request logger middleware for node.js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Use gzip compression

//
// Router
//
const indexRouter = require("./routes/index");
const oauth2Router = require("./routes/oauth2");
const usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/oauth2", oauth2Router);
app.use("/api-docs", express.static(__dirname + "/api-docs"));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//
// Error-handling middleware functions
//
app.use(errorHandler);

console.log("Environment:", process.env.NODE_ENV);

module.exports = app;
