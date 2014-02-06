var TontoDirectiveLoader = require('./tontoDirectiveLoader.js'),
		TontoDirective = require('./tontoDirective.js');

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
		directives = [],
		loader = new TontoDirectiveLoader('../apacheDirectives.yml');

	/* Load Directive Functions Onto This Instance */

	loader.attachFunctions(self);

	/* Private Functions */

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