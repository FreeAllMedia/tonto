/* Dependencies */
var fs = require('fs'),
	path = require('path'),
	yaml = require('js-yaml'),
	changeCase = require('change-case'),
	TontoDirective = require('./tontoDirective.js');

function TontoDirectiveLoader(directivesFilePath) {

	'use strict';

	/* Public Interface */

	this.attachFunctions = attachFunctions;

	/* Instance Variables */

	var apacheDirectives = readApacheDirectivesFile(directivesFilePath);

	/* Private Functions */

	function readApacheDirectivesFile(filePath) {
		return yaml.load(fs.readFileSync(path.join(__dirname, filePath)).toString());
	}

	function attachFunctions(object) {
		attachGroupFunctions(object);
		attachSoloFunctions(object);
	}

	function attachGroupFunctions(object) {

		var groupDirectives = filterGroupDirectives();

		groupDirectives.forEach(function (directiveName) {

			var functionName = changeCase.camelCase(directiveName.replace(/[<>]/, ''));

			object[functionName] = function (value, directiveSetter) {
				
				var TontoDirectiveCollection = require('./tontoDirectiveCollection.js');
				
				var subDirectiveCollection = new TontoDirectiveCollection();

				directiveSetter(subDirectiveCollection);

				object.push(new TontoDirective(directiveName, value, subDirectiveCollection));

				return object;

			};

		});
	}

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

	function filterGroupDirectives() {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); });
	}

	function filterSoloDirectives() {
		return apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); });
	}

}

module.exports = TontoDirectiveLoader;