/* Dependencies */
var fs = require('fs'),
	path = require('path'),
	yaml = require('js-yaml'),
	changeCase = require('change-case'),
	TontoDirective = require('./tontoDirective.js');

module.exports = function TontoDirectiveLoader(directivesFilePath) {

	'use strict';

	/* Public Interface */

	this.attachFunctions = attachFunctions;

	/* Instance Variables */

	var apacheDirectives = readApacheDirectivesFile(directivesFilePath);

	/* Private Functions */

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
	 * Generates and attaches directive functions as properties on the provided object.
	 *
	 * @param  {Object} object Object to attach functions to.
	 */
	function attachFunctions(object) {
		attachGroupFunctions(object);
		attachSoloFunctions(object);
	}

	/**
	 * Generates and attaches group directive functions as properties on the provided object.
	 *
	 * @param  {Object} object Object to attach group directive functions to.
	 */
	function attachGroupFunctions(object) {
		var groupDirectives = filterGroupDirectives();

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
	 * @param  {Object} object Object to attach solo directive functions to.
	 */
	function attachSoloFunctions(object) {
		var soloDirectives = filterSoloDirectives();

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
	 * @return {Array} Array with each group apache directive as an element. Note: Group elements are formatted as SGML-style start tags (i.e. surrounded by `<` and `>`).
	 */
	function filterGroupDirectives() {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); });
	}

	/**
	 * Returns only the solo directives from the instance variable apacheDirectives
	 *
	 * @return {Array} Array with each solo apache directive as an element.
	 */
	function filterSoloDirectives() {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); });
	}

};