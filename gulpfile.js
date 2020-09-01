require("@babel/register")({
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-modules-commonjs",
  ],
  ignore: [/node_modules\/(?!@grrr)/],
});
require("./gulpfile.babel.js");
