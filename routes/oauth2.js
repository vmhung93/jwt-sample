const express = require("express");

const router = express.Router();

const oauth2Controller = require("../controllers/oauth2.controller");

/* Google login */
router.get("/google", oauth2Controller.generateAuthUrl);

/* Authentication */
router.get("/google-callback", oauth2Controller.retrieveAccessToken);

module.exports = router;
