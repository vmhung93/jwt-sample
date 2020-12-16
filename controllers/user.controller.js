const userService = require("../services/user.service");

const { Role } = require("../constants/role");

/**
 * Seed admin
 */
const seedAdmin = async (req, res, next) => {
  try {
    debugger;
    const admin = await userService.findOne({ username: "admin" });

    if (admin) {
      return res.sendStatus(400).end();
    }

    await userService.create({
      firstName: "Admin",
      lastName: "Admin",
      username: "admin",
      password: "admin",
      roles: Role.Admin,
    });

    return res.sendStatus(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Seed users
 */
const seedUsers = async (req, res, next) => {
  try {
    await userService.createMany([
      {
        firstName: "Peter",
        lastName: "Brooks",
        username: "peter.brooks",
        password: "123x@X",
        roles: Role.User,
      },
      {
        firstName: "Louis",
        lastName: "Russell",
        username: "louis.russell",
        password: "123x@X",
        roles: Role.User,
      },
    ]);

    return res.sendStatus(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Get users
 */
const find = async (req, res, next) => {
  try {
    const users = await userService.find();

    if (!users) {
      return res.sendStatus(404).end();
    }

    return res.send(users);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  seedAdmin,
  seedUsers,
  find,
};
