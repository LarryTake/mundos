import { dest, src } from 'gulp';
import gulpBabel from 'gulp-babel';

export const babel = () => {
  src('src/**/*')
    .pipe(gulpBabel())
    .pipe(dest('dist'));
};
