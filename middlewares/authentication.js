const jwt = require("express-jwt");
const jwt_decode = require("jwt-decode");

const config = require("../utils/configuration");

const userService = require("../services/user.service");
const cacheService = require("../services/cache.service");

/**
 * Authentication middleware
 */
function authentication(roles = []) {
  try {
    // Roles param can be a single role string (e.g. Role.User or "User")
    // or an array of roles (e.g. [Role.Admin, Role.User] or ["Admin", "User"])
    if (typeof roles === "string") {
      roles = [roles];
    }

    const secret = config.get("webtoken:secret");
    const audience = config.get("webtoken:audience");
    const algorithm = config.get("webtoken:algorithm");

    return [
      // Authenticate JWT token and attach user to request object (req.user)
      jwt({
        secret,
        algorithms: [algorithm],
        audience: audience,
        getToken: function retrieveTokenFromHeaderOrQuerystring(req) {
          if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt_decode(token);

            if (cacheService.hasKey(payload.jti)) {
              return null;
            }

            return token;
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
        },
      }),

      // Authorize based on user role
      async (req, res, next) => {
        const user = await userService.findById(req.user.id);

        if (!user || (roles.length && !hasPermission(user.roles, roles))) {
          // User no longer exists or role not authorized
          return res.status(401).end();
        }

        // Authentication and authorization successful
        req.user.roles = user.roles;

        next();
      },
    ];
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Check user permission
 */
const hasPermission = (source, dest) => {
  return dest.every((d) => source.includes(d));
};

module.exports = authentication;
