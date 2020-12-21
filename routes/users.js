const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

/* GET - Users listing */
router.get("/", userController.find);

/* GET - Users paging */
router.get("/paginate", userController.paginate);

/* GET - Seed admin */
router.get("/seed-admin", userController.seedAdmin);

/* GET - Seed users */
router.get("/seed-users", userController.seedUsers);

module.exports = router;
