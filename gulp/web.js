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
    gulp.src('src/dev/index.jsx')
        .pipe(webpackStream(require('./config/webpack-dev.config')))
        .pipe(gulp.dest('dev_build/'));
});

gulp.task('web:build:prod', () => {
    gulp.src('src/dev/index.jsx')
        .pipe(webpackStream(require('./config/webpack-prod.config')))
        .pipe(gulp.dest('docs/'));
});

gulp.task('web:serve', (done) => {
    const webpackDev = require('./config/webpack-serve.config');
    const compiler = webpack(webpackDev);

    const server = new WebpackDevServer(compiler, {
        hot: true,
        quiet: true,
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
