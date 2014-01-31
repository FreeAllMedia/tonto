module.exports = function TontoDirectiveCollection() {

	'use strict';

	/* Requirements */

	var Directive = require('./tontoDirective.js');

	/* Public Interface */

	this.forEach = forEach;
	this.push = push;
	this.all = all;
	this.render = render;

	this.virtualHost = virtualHost;
	this.serverName = serverName;
	this.header = header;
	
	/* Private Instance Variables */

	var self = this,
		directives = [];

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

	/**
	 * Add a <VirtualHost> directive to the collection
	 *
	 * @method virtualHost
	 * 
	 * @param  {string} address
	 * @param  {number} port
	 * @param  {function(TontoDirectiveCollection)}   directiveSetter    A delegate function with a directive collection as the sole argument.
	 * 
	 * @return {TontoDirectiveCollection}                                Returns a copy of `this` to enable chaining.
	 */
	function virtualHost(address, port, directiveSetter) {

		var directiveCollection = new TontoDirectiveCollection();

		directiveSetter(directiveCollection);

		push(new Directive('VirtualHost', address + ':' + port, directiveCollection));

		return self;

	}

	/**
	 * Add a ServerName directive to the collection
	 * 
	 * @method serverName
	 * 
	 * @param  {string} address
	 * 
	 * @return {TontoDirectiveCollection} Returns a copy of `this` to enable chaining.
	 */
	function serverName(address) {
		push(new Directive('ServerName', address));
		return self;
	}

	/**
	 * Add a Header directive to the collection
	 * 
	 * @method header
	 * 
	 * @param  {string} value
	 * 
	 * @return {TontoDirectiveCollection} Returns a copy of `this` to enable chaining.
	 */
	function header(value) {
		push(new Directive('Header', value));
		return self;
	}

	function directory(directoryPath, directivesSetter) {}

	function addOutputFilterByType(value) {}

	function browserMatch(value) {}

	function options(value) {}

	function allowOverride(value) {}

	function order(value) {}

	function allow(value) {}

	function proxyPass(path, url) {}

	function proxyPassReverse(path, url) {}

	function proxyPassMatch(path, url) {}

	function sslCertificateFile(certificatePath) {}

	function sslKeyFile(certificatePath) {}

	function sslChainFile(certificatePath) {}
	
};