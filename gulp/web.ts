/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* eslint-disable global-require,no-console */

import Webpack from 'webpack';
import WebpackDevServer, { Configuration as DevServerConfig } from 'webpack-dev-server';

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
  exclude: ['node_modules'],
};

const webBuildDev = (cb: (err?: Error) => void) => {
  Webpack(require('./config/webpack-dev.config'), (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats?.toString(webpackToStringOptions));
    cb();
  });
};

const webBuildProd = (cb: (err?: Error) => void) => {
  Webpack(require('./config/webpack-prod.config'), (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats?.toString(webpackToStringOptions));
    cb();
  });
};

const webServe = (cb: (err?: Error) => void) => {
  // eslint-disable-next-line global-require
  const webpackDev = require('./config/webpack-serve.config');
  const compiler = Webpack(webpackDev);
  const devServerConfig: DevServerConfig = {
    hot: true,
    historyApiFallback: true,
  };
  const server = new WebpackDevServer(devServerConfig, compiler);

  const run = async () => {
    console.log('\n==> Webpack Listening on http://localhost:8080\n');
    try {
      await server.start();
    } catch (err) {
      cb(err);
    }
  };

  run();
};

webBuildDev.displayName = 'web:build:dev';
webBuildProd.displayName = 'web:build:prod';
webServe.displayName = 'web:serve';

export { webBuildDev, webBuildProd, webServe };
