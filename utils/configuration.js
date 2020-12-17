const path = require("path");
const nconf = require("nconf");

let filename = "config.development.json";

if (process.env.NODE_ENV === "production") {
  filename = "config.json";
}

const file = path.join(__dirname, "../", filename);

nconf.file({ file: file });

module.exports = nconf;
