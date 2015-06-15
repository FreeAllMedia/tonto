/**
 * ```
 *  _____ ___  _  _ _____ ___
 * |_   _/ _ \| \| |_   _/ _ \
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 * # TontoDirectiveRenderer.js
 *
 * Renders TontoDirectives into valid apache config strings.
 *
 * @class TontoDirectiveRenderer
 * @constructor
 * @static
 */
function TontoDirectiveRenderer() {}

module.exports = TontoDirectiveRenderer;

(function (TontoDirectiveRenderer) {

	'use strict';

	TontoDirectiveRenderer.render = render;

	/**
	 * Determines if a directive is block or solo, then render it to string.
	 *
	 * @method render
	 * @static
	 * @public
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function render(directive) {
		if (directive.directives) {
			return renderBlock(directive);
		} else {
			return renderSolo(directive);
		}
	}

	/**
	 * Render a block directive to string.
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function renderBlock(directive) {
		var startTag = renderStartTag(directive),
			content = renderBlockContent(directive),
			endTag = renderEndTag(directive);

		content = addTabToEachLine(content);

		return [startTag, content, endTag].join('\n');
	}

	/**
	 * Render a solo directive to string.
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function renderSolo(directive) {
		return directive.name + ' ' + directive.value;
	}

	/**
	 * Render the start tag of a block directive to string.
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function renderStartTag(directive) {
		return '<' + directive.name + ' ' + directive.value + '>';
	}

	/**
	 * Render the end tag of a block directive to string.
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function renderEndTag(directive) {
		return '</' + directive.name + '>';
	}

	/**
	 * Render a block directive's content to string.
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function renderBlockContent(directive) {
		var content = [];

		directive.directives.forEach(renderToContent);
		function renderToContent(directive) {
			content.push(directive.render());
		}

		return content.join('\n');
	}

	/**
	 * Add a starting tab to each line of a string
	 *
	 * @param  {TontoDirective} directive
	 * @return {string}
	 */
	function addTabToEachLine(content) {
		content = content.split('\n'); // Split multi-line string into array of lines

		content.forEach(addTabToLine);
		function addTabToLine(contentLine, index) {
			content[index] = '\t' + contentLine;
		}

		return content.join('\n');
	}

})(TontoDirectiveRenderer);