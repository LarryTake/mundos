/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* eslint-disable no-console */

import Webpack from "webpack";
import WebpackDevServer, {
  Configuration as DevServerConfig,
} from "webpack-dev-server";

type CallbackType = (err?: Error) => void;

const webpackToStringOptions = {
  colors: {
    level: 1,
    hasBasic: true,
    has256: false,
    has16m: false,
  },
  cached: false,
  cachedAssets: false,
  modules: true,
  chunks: false,
  reasons: false,
  errorDetails: false,
  chunkOrigins: false,
  exclude: ["node_modules"],
};

async function webBuildDev(cb: CallbackType) {
  const { default: configDev } = await import("./config/webpack-dev.config");
  Webpack(configDev, (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats?.toString(webpackToStringOptions));
    cb();
  });
}

async function webBuildProd(cb: CallbackType) {
  const { default: configProd } = await import("./config/webpack-prod.config");
  Webpack(configProd, (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats?.toString(webpackToStringOptions));
    cb();
  });
}

async function webServe(cb: CallbackType) {
  const { default: webpackDev } = await import("./config/webpack-serve.config");
  const compiler = Webpack(webpackDev);
  const devServerConfig: DevServerConfig = {
    hot: true,
    historyApiFallback: true,
  };
  const server = new WebpackDevServer(devServerConfig, compiler);

  console.log("\n==> Webpack Listening on http://localhost:8080\n");
  try {
    await server.start();
  } catch (err) {
    cb(err as Error);
  }
}

webBuildDev.displayName = "web:build:dev";
webBuildProd.displayName = "web:build:prod";
webServe.displayName = "web:serve";

export { webBuildDev, webBuildProd, webServe };
