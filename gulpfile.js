const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const minify = require("gulp-minify");
const rename = require("gulp-rename");

gulp.task("optimize-js", function () {
  return gulp
    .src("./js/*.js")
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./dest/js/"));
});

gulp.task("concatjs", function concatFunc() {
  return gulp
    .src([
      "js/utils.js",
      "js/map.js",
      "js/nolocationresultresult.js",
      "js/locationsearch.js",
      "js/shownearest.js",
      "js/currentlocation.js",
      "js/sendtoparent.js",
      "js/main.js",
    ])
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("js-production"));
});

gulp.task("default", function () {
  gulp.watch("js/*.js", gulp.series("concatjs"));

  return;
});
