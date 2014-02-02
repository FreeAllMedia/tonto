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

	var util = require('util');

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

		var startTag = '<' + name + ' ' + value + '>',
			endTag = '</' + name + '>',
			content = [],
			renderedString;

		directives.forEach(renderToContent);

		function renderToContent(directive) {
			content.push(directive.render());
		}

		// This looks weird, but we're really adding newline characters between each sub-directive,
		// then splitting all of those directives by line so that a tab can be added to the start of each.
		content = content.join('\n').split('\n');

		content.forEach(addTab);

		function addTab(contentLine, index) {
			content[index] = '\t' + contentLine;
		}

		content = content.join('\n');

		renderedString = [startTag, content, endTag].join('\n');

		return renderedString;

	}

	function renderSolo(directive) {

		return directive.name + ' ' + directive.value;

	}

};