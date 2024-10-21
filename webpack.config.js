const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
