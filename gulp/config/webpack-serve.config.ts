/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

import fs from "fs";
import path from "path";
import webpack from "webpack";

import configDev from "./webpack-dev.config";

const babelrcString = fs.readFileSync(
  path.resolve(__dirname, "../../.babelrc")
);
const babelrc = JSON.parse(babelrcString.toString());

// Update
configDev.bail = false;
configDev.module.rules = configDev.module.rules
  // Remove eslint
  .filter((rule) => rule.loader !== "eslint-loader")
  // Change babel-loader configuration
  .map((rule) => {
    if (rule.loader !== "babel-loader") {
      return rule;
    }

    rule.options = babelrc as object; // eslint-disable-line no-param-reassign
    rule.options.babelrc = false; // eslint-disable-line no-param-reassign
    return rule;
  });
configDev.entry.app.push("webpack-dev-server/client?http://localhost:8080");
configDev.entry.app.push("webpack/hot/only-dev-server");
configDev.plugins.push(new webpack.NoEmitOnErrorsPlugin());

export default configDev;
