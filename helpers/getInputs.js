const fs = require("fs");

module.exports = filePath => {
  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map(item => parseInt(item));
};
