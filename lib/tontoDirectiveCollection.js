/* Dependencies */

var TontoDirective = require('./tontoDirective.js'),
	fs = require('fs'),
	path = require('path'),
	yaml = require('js-yaml'),
	changeCase = require('change-case');

/**
 * ```
 *  _____ ___  _  _ _____ ___  
 * |_   _/ _ \| \| |_   _/ _ \ 
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 *
 * # TontoDirectiveCollection.js
 *
 * Manages a collection of TontoDirective objects.
 *
 * @class TontoDirectiveCollection
 * @constructor
 */
module.exports = function TontoDirectiveCollection() {

	'use strict';

	/* Public Interface */

	this.forEach = forEach;
	this.push = push;
	this.all = all;
	this.render = render;
	
	/* Private Instance Variables */

	var self = this,
		directives = [];

	/* Initializer */

	loadApacheDirectives();

	/* Private Functions */

	function readApacheDirectivesFile() {
		yaml.load(fs.readFileSync(path.join(__dirname, '../apacheDirectives.yml')).toString());
	}

	function filterGroupDirectives(directives) {
		return directives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); });
	}

	function filterSoloDirectives(directives) {
		return directives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); });
	}

	function loadApacheDirectives() {
		var apacheDirectives = readApacheDirectivesFile(),
			groupDirectives = filterGroupDirectives(apacheDirectives),
			soloDirectives = filterSoloDirectives(apacheDirectives);

		groupDirectives.forEach(function (directiveName) {

			var functionName = changeCase.camelCase(directiveName.replace(/[<>]/, ''));

			self[functionName] = function (value, directiveSetter) {

				var subDirectives = new TontoDirectiveCollection();
				directiveSetter(subDirectives);

				directives.push(new TontoDirective(directiveName, value, subDirectives));

				return self;

			};

		});

		soloDirectives.forEach(function (directiveName) {

			var functionName = changeCase.camelCase(directiveName.replace(/[<>]/, ''));

			self[functionName] = function (value) {

				directives.push(new TontoDirective(directiveName, value));

				return self;

			};

		});

	}

	function forEach(iteratorFunction) {
		directives.forEach(iteratorFunction);
	}

	function render() {

		var directiveStrings = [];

		directives.forEach(getDirectiveString);

		function getDirectiveString(directive) {
			directiveStrings.push(directive.render());
		}

		return directiveStrings.join('\n');

	}

	function push(directive) {
		directives.push(directive);
	}

	function all() {
		return directives;
	}

};