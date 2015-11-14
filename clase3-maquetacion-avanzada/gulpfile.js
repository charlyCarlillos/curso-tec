var gulp = require('gulp'); 
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');//Levanta un servidor local
var livereload = require('gulp-livereload');


////////////STYLUS///////////////7///
var stylus = require('gulp-stylus');//Permite compilar stylus
var nib = require('nib');//agrega prefijos a los atributos CSS
var minifyCSS = require('gulp-minify-css'); //Minifica los CSS

//////////////JS/////////////////
var uglify = require('gulp-uglify'); //minificar js

////////////////JADE/////////////
var jade = require('gulp-jade');

///////////////BORRAR CARPETA PUBLIC CADA VEZ QUE TRABAJE GULP////////
var clean = require('gulp-rimraf');


var config={
	styles: {
		main: './src/styles/app.styl',
		output: './build/css'
	},
	htmls: {
		main: './src/index.jade',
		output: './build'
	},
	scripts:{
		main: './src/scripts/app.js',
		output: './build/js'
	}
}

gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
				pretty: true
			}))
		.pipe(gulp.dest(config.htmls.output));
});

gulp.task('build:css', function(){
	gulp
		.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css':true
			}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));

});