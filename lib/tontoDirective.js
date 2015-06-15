var Renderer = require('./tontoDirectiveRenderer.js');

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

	/**
	 * Value used for the directive, such as "*:80", or "On"
	 * @property {string} value
	 */
	this.value = _value;

	/**
	 * If a TontoDirectiveCollection object is provided, the directive will render as an SGML-style block containing all rendered _directives.
	 * @property {TontoDirectiveCollection} directives
	 */
	this.directives = _directives;

	/**
	 * Renders the directive to a valid apache config string.
	 * @method render
	 * @returns {string} Valid rendered apache config string.
	 */
	this.render = render;

	/* Private Functions */

	var self = this;

	function render() {

		return Renderer.render(self);

	}

};