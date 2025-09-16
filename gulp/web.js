/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('web:build:dev', (done) => {
    webpack(require('./config/webpack-dev.config'), done);
});

gulp.task('web:build:prod', (done) => {
    webpack(require('./config/webpack-prod.config'), (err, stats) => {
        if (err) {
            return done(err);
        }

        console.log(stats.toString());
        done();
    });
});

gulp.task('web:serve', (done) => {
    const webpackDev = require('./config/webpack-serve.config');
    const compiler = webpack(webpackDev);

    const server = new WebpackDevServer(compiler, {
        inline: true,
        hot: true,
        quiet: false,
        noInfo: false,
        debug: true,
        devTool: true,
        contentBase: 'dev/',
        publicPath: webpackDev.output.publicPath,
        historyApiFallback: true,
        stats: {
            colors: true,
        },
    });
    server.listen(8080, (err) => {
        if (err) {
            done(err);
            return;
        }
        console.log('==> Listening on http://localhost:8080');
    });
});
