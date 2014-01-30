/**
 * ```
 *  _____ ___  _  _ _____ ___  
 * |_   _/ _ \| \| |_   _/ _ \ 
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 * # TontoDirective.js
 *
 * Manager for a single apache directive in Tonto.js
 *
 * @class TontoDirective
 * @constructor
 * @param  {string}                    name                   Name of the directive in the generated config file, i.e. "VirtualHost", or "RewriteEngine"
 * @param  {string}                    value                  Value used for the directive, such as "*:80", or "On"
 * @param  {Object}                    [options]
 * @param  {TontoDirectiveCollection}  [options.directives]   If a TontoDirectiveCollection object is provided, options.block will automatically be set to true, and the content of the block will be the directives contained in the TontoDirectiveCollection object.
 */
module.exports = function TontoDirective(name, value, directives) {

	/* Private Instance Variables */

	/* Public Interface */

	this.name = name;
	this.value = value;
	this.directives = directives;
	this.render = render;

	/* Private Functions */

	function render() {
		var generatedString;
		if (directives) {
			generatedString = renderBlock();
		} else {
			generatedString = renderPlain(this);
		}
		return generatedString;
	}

	function renderBlock() {
		var generatedString = '<' + name + ' ' + value + '>\n';

		directives.forEach(function (directive) {
			generatedString += '\t' + renderPlain(directive) + '\n';
		});
		generatedString += '</' + name + '>';
		return generatedString;
	}

	function renderPlain(directive) {
		return directive.name + ' ' + directive.value;
	}

};