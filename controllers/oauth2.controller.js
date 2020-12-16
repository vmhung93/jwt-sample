const oauth2Service = require("../services/oauth2.service");

/**
 * Generating an authentication URL
 */
const generateAuthUrl = (req, res, next) => {
  try {
    const authUrl = oauth2Service.generateAuthUrl();

    return res.send(authUrl);
  } catch (e) {
    next(e);
  }
};

const retrieveAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;
    const token = await oauth2Service.retrieveAccessToken(code);

    if(token) {
      res.send(token);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  generateAuthUrl,
  retrieveAccessToken,
};
