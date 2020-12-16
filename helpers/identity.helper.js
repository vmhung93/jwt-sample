const crypto = require("crypto");

/**
 * Generate unique string by date time value
 */
const generate = () => {
  return crypto
    .createHash("sha256")
    .update(new Date().getTime().toString())
    .digest("hex");
};

module.exports = {
  generate,
};
