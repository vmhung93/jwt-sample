const bcrypt = require("bcryptjs");

const { db } = require("../db/mongoose");

/**
 * Create a user
 */
const create = async (obj) => {
  try {
    const user = new db.User({
      firstName: obj.firstName,
      lastName: obj.lastName,
      username: obj.username,
      passwordHash: bcrypt.hashSync(obj.password, 10),
      roles: obj.roles,
    });

    await user.save();
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Create users
 */
const createMany = async (obj) => {
  try {
    const users = obj.map((value, index, array) => {
      return {
        firstName: value.firstName,
        lastName: value.lastName,
        username: value.username,
        passwordHash: bcrypt.hashSync(value.password, 10),
        roles: value.roles,
      };
    });

    await db.User.insertMany(users);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Find all users
 */
const find = async () => {
  try {
    const users = await db.User.find();

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
    const user = await db.User.findOne(obj);

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
    const user = await db.User.findById(userId).exec();

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
