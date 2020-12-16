const mongoose = require("mongoose");
const config = require("../utils/configuration");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(config.get("connectionString"), connectionOptions);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.warn.bind(console, "mongoose connnected"));

// Schema
const userSchema = require("../models/user");

module.exports.db = {
  User: userSchema,
};
