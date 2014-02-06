var fs = require('fs'),
	path = require('path'),
	yaml = require('js-yaml'),
	changeCase = require('change-case'),
	TontoDirective = require('./tontoDirective.js');

/**
 * ```
 *  _____ ___  _  _ _____ ___
 * |_   _/ _ \| \| |_   _/ _ \
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 * # TontoDirectiveLoader.js
 *
 * Load directive names from a yaml file, then generate functions to be added onto
 *
 * @class TontoDirectiveLoader
 * @constructor
 * @static
 */
function TontoDirectiveLoader() {}

module.exports = TontoDirectiveLoader;

(function (TontoDirectiveLoader) {

	'use strict';

	/* Static Interface */

	TontoDirectiveLoader.attachFunctions = attachFunctions;

	/* Private Functions */

	/**
	 * Generates and attaches directive functions as properties on the provided object.
	 *
	 * @method attachFunctions
	 * @static
	 *
	 * @param  {string} filePath path to the apacheDirectives.yml file
	 * @param  {Object} object Object that you want to add function properties to.
	 */
	function attachFunctions(directivesFilePath, object) {
		var apacheDirectives = readApacheDirectivesFile(directivesFilePath);
		attachGroupFunctions(apacheDirectives, object);
		attachSoloFunctions(apacheDirectives, object);
	}

	/**
	 * Read directives from an apacheDirectives.yml file, return each directive in an array.
	 *
	 * @param  {string} filePath path to the apacheDirectives.yml file
	 * @return {Array} Array with each apache directive's name as elements. Group elements are SGML-style start tags, surrounded by `<` and `>`.
	 */
	function readApacheDirectivesFile(filePath) {
		return yaml.load(fs.readFileSync(path.join(__dirname, filePath)).toString());
	}

	/**
	 * Generates and attaches group directive functions as properties on the provided object.
	 *
	 * @param {Array} apacheDirectives Array with all apache directives as elements.
	 * @param {Object} object Object to attach group directive functions to.
	 */
	function attachGroupFunctions(apacheDirectives, object) {
		var groupDirectives = filterGroupDirectives(apacheDirectives);

		groupDirectives.forEach(function (directiveName) {
			directiveName = directiveName.replace(/[<>]/g, ''); // Remove SGML tag markup from group directive name

			var functionName = changeCase.camelCase(directiveName);

			object[functionName] = function (value, directiveSetter) {
				var TontoDirectiveCollection = require('./tontoDirectiveCollection.js'),
						subDirectiveCollection = new TontoDirectiveCollection();

				directiveSetter(subDirectiveCollection);

				object.push(new TontoDirective(directiveName, value, subDirectiveCollection));

				return object;
			};
		});
	}

	/**
	 * Generates and attaches solo directive functions as properties on the provided object.
	 *
	 * @param {Array} apacheDirectives Array with all apache directives as elements.
	 * @param {Object} object Object to attach solo directive functions to.
	 */
	function attachSoloFunctions(apacheDirectives, object) {
		var soloDirectives = filterSoloDirectives(apacheDirectives);

		soloDirectives.forEach(function (directiveName) {
			var functionName = changeCase.camelCase(directiveName);

			object[functionName] = function (value) {
				object.push(new TontoDirective(directiveName, value));
				return object;
			};
		});
	}

	/**
	 * Returns only the group directives from the instance variable apacheDirectives
	 *
	 * @param {Array} apacheDirectives Array with all apache directives as elements.
	 * @return {Array} Array with each group apache directive as an element. Note: Group elements are formatted as SGML-style start tags (i.e. surrounded by `<` and `>`).
	 */
	function filterGroupDirectives(apacheDirectives) {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); });
	}

	/**
	 * Returns only the solo directives from the instance variable apacheDirectives
	 *
	 * @param {Array} apacheDirectives Array with all apache directives as elements.
	 * @return {Array} Array with each solo apache directive as an element.
	 */
	function filterSoloDirectives(apacheDirectives) {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); });
	}

})(TontoDirectiveLoader);