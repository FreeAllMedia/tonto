module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'lib/*', 'tests/*'],
			options: {
				jshintrc: './.jshintrc'
			}
		},
		complexity: {
			generic: {
				src: ['lib/*'],
				options: {
					breakOnErrors: true,
					errorsOnly: false,               // show only maintainability errors
					cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
					halstead: [8, 13, 20],           // or optionally a single value, like 8
					maintainability: 100
				}
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
	grunt.loadNpmTasks('grunt-complexity');

	grunt.registerTask('travis', ['jshint', 'test', 'complexity', 'mochacov:coverage']);
	grunt.registerTask('test', ['mochacov:test']);

};