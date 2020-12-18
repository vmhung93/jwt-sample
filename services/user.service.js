const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { db } = require("../db/mongoose");

/**
 * Create a user
 */
const create = async (obj) => {
  try {
    debugger;
    const profile = new db.UserProfile({
      _id: new mongoose.Types.ObjectId(),
      address: obj.address,
      phone: obj.phone,
    });

    profile.save(function (err) {
      if (err) {
        return db.HandleError(err);
      }

      const user = new db.User({
        firstName: obj.firstName,
        lastName: obj.lastName,
        username: obj.username,
        passwordHash: bcrypt.hashSync(obj.password, 10),
        roles: obj.roles,
        profile: profile._id,
      });

      user.save();
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Create users
 */
const createMany = async (obj) => {
  try {
    debugger;
    let profiles = [];
    let users = [];

    obj.forEach((value, index, array) => {
      const profile = new db.UserProfile({
        _id: new mongoose.Types.ObjectId(),
        address: value.address,
        phone: value.phone,
      });

      profiles.push(profile);
      users.push(
        new db.User({
          firstName: value.firstName,
          lastName: value.lastName,
          username: value.username,
          passwordHash: bcrypt.hashSync(value.password, 10),
          roles: value.roles,
          profile: profile._id,
        })
      );
    });

    db.UserProfile.insertMany(profiles, function (err, docs) {
      if (err) {
        return db.HandleError(err);
      }

      db.User.insertMany(users);
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Find all users
 */
const find = async () => {
  try {
    const users = await db.User.find().populate("profile", [
      "address",
      "phone",
    ]);

    return users;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Find one
 */
const findOne = async (obj) => {
  try {
    const user = await db.User.findOne(obj).populate("profile");

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Find by id
 */
const findById = async (userId) => {
  try {
    const user = await db.User.findById(userId).populate("profile").exec();

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  createMany,
  find,
  findOne,
  findById,
};
