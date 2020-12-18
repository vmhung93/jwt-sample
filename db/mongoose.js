const mongoose = require("mongoose");

const config = require("../utils/configuration");
const logger = require("../utils/logger");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(config.get("connectionString"), connectionOptions);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongoose error:"));
db.once("open", console.warn.bind(console, "Mongoose connnected"));

// Handle error
const handleError = (err) => {
  logger.error(err);
};

// Model
const userModel = require("../models/user");
const userProfileModel = require("../models/user.profile");

module.exports.db = {
  User: userModel,
  UserProfile: userProfileModel,
  HandleError: handleError,
};
