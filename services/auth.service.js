const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const config = require("../utils/configuration");

const identityHelper = require("../helpers/identity.helper");

const userService = require("../services/user.service");
const cacheService = require("../services/cache.service");

/**
 * Authenticate
 */
const authenticate = async (username, password) => {
  try {
    const user = await userService.findOne({ username: username });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw new Error("Username or password is incorrect");
    }

    // Authentication successful so generate jwt token
    const jwtToken = generateJwtToken(user);

    // Return user and token
    return {
      ...userInfo(user),
      jwtToken,
    };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Generate jwt token
 */
const generateJwtToken = (user) => {
  try {
    const secret = config.get("webtoken:secret");
    const audience = config.get("webtoken:audience");
    const algorithm = config.get("webtoken:algorithm");
    const expiresIn = config.get("webtoken:expiresIn");
    const jwtId = identityHelper.generate();

    // Create a jwt token containing the user info that expires in 15 minutes
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
      secret,
      {
        algorithm: algorithm,
        audience: audience,
        expiresIn: expiresIn,
        jwtid: jwtId,
      }
    );
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Verify token
 */
const verifyToken = (token) => {
  try {
    const secret = config.get("webtoken:secret");
    const audience = config.get("webtoken:audience");

    const payload = jwt.verify(token, secret, { audience: audience });

    return payload;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Revoke token
 * Store token to cache - Black list
 */
const revokeToken = (token) => {
  try {
    const payload = jwt_decode(token);

    cacheService.set(payload.jti, token, 15 * 60);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Retrieve  the basic user info
 */
function userInfo(user) {
  const { id, firstName, lastName, username, roles } = user;
  return { id, firstName, lastName, username, roles };
}

module.exports = { authenticate, generateJwtToken, revokeToken, verifyToken };
