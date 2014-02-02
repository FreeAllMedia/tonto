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
 * @param  {TontoDirectiveCollection}  [directives]           If a TontoDirectiveCollection object is provided, the directive will render as an SGML-style block containing all rendered _directives.
 */
module.exports = function TontoDirective(_name, _value, _directives) {

	'use strict';

	/* Public Interface */

	/**
	 * Name of the directive in the generated config file, i.e. "VirtualHost", or "RewriteEngine"
	 * @property {string} name
	 */
	this.name = _name;
	this.value = _value;
	this.directives = _directives;
	this.render = render;

	/* Private Instance Variables */

	var self = this,
		name = this.name,
		value = this.value,
		directives = this.directives;

	/* Private Functions */

	function render() {

		var generatedString;

		if (directives) {
			generatedString = renderBlock();
		} else {
			generatedString = renderSolo(self);
		}

		return generatedString;

	}

	function renderBlock() {

		var generatedString = '<' + name + ' ' + value + '>\n';

		directives.forEach(function (directive) {
			generatedString += '\t' + renderSolo(directive) + '\n';
		});

		generatedString += '</' + name + '>';

		return generatedString;

	}

	function renderSolo(directive) {

		return directive.name + ' ' + directive.value;
    
	}

};