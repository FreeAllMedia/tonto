module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'lib/*', 'tests/*'],
			options: {
				jshintrc: './.jshintrc'
			}
		},
		mochacov: {
			coverage: {
				options: {
					coveralls: true
				}
			},
			test: {
				options: {
					reporter: 'spec'
				}
			},
			options: {
				files: 'tests/*.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-cov');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('travis', ['jshint', 'test', 'mochacov:coverage']);
	grunt.registerTask('test', ['mochacov:test']);

};