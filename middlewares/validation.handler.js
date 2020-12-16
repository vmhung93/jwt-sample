/**
 * Validation handler
 */
const validation = (req, res, next, schema) => {
  const options = {
    abortEarly: false, // Include all errors
    allowUnknown: true, // Ignore unknown props
    stripUnknown: true, // Remove unknown elements from objects and arrays
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res
      .status(400)
      .json({
        errors: `Validation error: ${error.details
          .map((x) => x.message)
          .join(", ")}`,
      });
  } else {
    req.body = value;
    next();
  }
};

module.exports = validation;
