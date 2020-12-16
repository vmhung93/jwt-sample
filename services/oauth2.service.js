const { google } = require("googleapis");

const config = require("../utils/configuration");

const googleConfig = {
  clientId: config.get("google:clientId"),
  clientSecret: config.get("google:clientSecret"),
  redirect: config.get("google:redirect"),
};

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

// https://developers.google.com/identity/protocols/oauth2/scopes#oauth2
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
};

const retrieveAccessToken = async (code) => {
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  return tokens;
};

module.exports = { generateAuthUrl, retrieveAccessToken };
