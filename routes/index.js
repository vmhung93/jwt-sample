const express = require("express");
const { Role } = require("../constants/role");
const router = express.Router();

const authentication = require("../middlewares/authentication");

const authController = require("../controllers/auth.controller");

/* GET */
router.get("/", function (req, res, next) {
  res.sendStatus(200).end();
});

/* Login */
router.post("/login", authController.validate("login"), authController.login);

/* Authentication */
router.post("/auth", authentication([Role.Admin]), function (req, res, next) {
  res.sendStatus(200).end();
});

/* Verify token */
router.post(
  "/verify-token",
  authController.validate("verify-token"),
  authController.verifyToken
);

/* Revoke token */
router.post("/revoke-token", authentication(), authController.revokeToken);

module.exports = router;
