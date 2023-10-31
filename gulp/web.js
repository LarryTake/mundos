/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('web:build:dev', () => {
    gulp.src('src/webDev/index.js')
        .pipe(webpackStream(require('./config/webpack-dev.config')))
        .pipe(gulp.dest('dev_build/'));
});

gulp.task('web:serve', (done) => {
    const server = new WebpackDevServer(webpack(require('./config/webpack-serve.config')), {
        hot: true,
        quiet: true,
        noInfo: false,
        debug: true,
        devTool: true,
        contentBase: 'dev/',
        historyApiFallback: true,
        stats: {
            colors: true,
        },
    });
    server.listen(8080, done);
});
