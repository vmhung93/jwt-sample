const Joi = require("joi");

const validation = require("../middlewares/validation.handler");

const authService = require("../services/auth.service");

/**
 * Validation chain
 */
const validate = (method) => {
  return async (req, res, next) => {
    try {
      let schema = Joi.object({});

      switch (method) {
        case "login":
          schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required().min(4),
          });

          break;

        case "verify-token":
          schema = Joi.object({
            token: Joi.string().required(),
          });

          break;
      }

      validation(req, res, next, schema);
    } catch (e) {
      next(e);
    }
  };
};

/**
 * Login
 */
const login = async (req, res, next) => {
  try {
    const user = await authService.authenticate(
      req.body.username,
      req.body.password
    );

    if (!user) {
      return res.sendStatus(401).end();
    }

    return res.send(user);
  } catch (e) {
    next(e);
  }
};

/**
 * Verify jwt token
 */
const verifyToken = (req, res, next) => {
  try {
    const payload = authService.verifyToken(req.body.token);

    if (!payload) {
      return res.sendStatus(401).end();
    }

    return res.send(payload);
  } catch (e) {
    next(e);
  }
};

/**
 * Revoke jwt token
 */
const revokeToken = (req, res, next) => {
  try {
    // Retrieve token from request header
    const token = req.headers.authorization.split(" ")[1];

    // Revoke token
    authService.revokeToken(token);

    return res.sendStatus(200).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validate,
  login,
  verifyToken,
  revokeToken,
};
