/* eslint-disable no-console,global-require */

/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

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

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

const buildDev = (cb) => {
    webpack(require('./config/webpack-dev.config'), (err, stats) => {
        if (err) {
            cb(err);
            return;
        }

        console.log(stats.toString(webpackToStringOptions));
        cb();
    });
};

const buildProd = (cb) => {
    webpack(require('./config/webpack-prod.config'), (err, stats) => {
        if (err) {
            cb(err);
            return;
        }

        console.log(stats.toString(webpackToStringOptions));
        cb();
    });
};

const serve = (cb) => {
    // eslint-disable-next-line global-require
    const webpackDev = require('./config/webpack-serve.config');
    const compiler = webpack(webpackDev);

    const server = new WebpackDevServer(compiler, {
        inline: true,
        hot: true,
        quiet: false,
        noInfo: false,
        contentBase: 'dev/',
        publicPath: webpackDev.output.publicPath,
        historyApiFallback: true,
        stats: {
            colors: true,
        },
    });
    server.listen(8080, (err) => {
        if (err) {
            cb(err);
            return;
        }
        console.log('\n==> Webpack Listening on http://localhost:8080\n');
    });
};

exports.build = {
    dev: buildDev,
    prod: buildProd,
};
exports.serve = serve;
