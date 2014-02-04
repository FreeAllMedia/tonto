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
 */
function TontoDirectiveRenderer() {}

module.exports = TontoDirectiveRenderer;

(function TontoDirectiveNamespace(TontoDirectiveRenderer) {

	'use strict';

	TontoDirectiveRenderer.render = render;

	function render(directive) {

		if (directive.directives) {
			return renderBlock(directive);
		} else {
			return renderSolo(directive);
		}
	}

	function renderBlock(directive) {

		var startTag = renderStartTag(directive),
			content = renderBlockContent(directive),
			endTag = renderEndTag(directive);

		content = addTabination(content);

		return [startTag, content, endTag].join('\n');

	}

	function addTabination(content) {
		content = content.split('\n');
		content.forEach(addTab);
		function addTab(contentLine, index) {
			content[index] = '\t' + contentLine;
		}
		return content.join('\n');
	}

	function renderStartTag(directive) {
		return '<' + directive.name + ' ' + directive.value + '>';
	}

	function renderEndTag(directive) {
		return '</' + directive.name + '>';
	}

	function renderBlockContent(directive) {

		var content = [];

		directive.directives.forEach(renderToContent);

		function renderToContent(directive) {
			content.push(directive.render());
		}

		return content.join('\n');

	}

	function renderSolo(directive) {

		return directive.name + ' ' + directive.value;

	}

})(TontoDirectiveRenderer);