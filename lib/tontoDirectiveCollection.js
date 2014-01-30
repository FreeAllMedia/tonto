var util = require('util');

module.exports = function TontoDirectiveCollection() {

	/* Requirements */

	var Directive = require('./tontoDirective.js');

	/* Public Interface */

	this.forEach = forEach;
	this.virtualHost = virtualHost;
	this.push = push;
  this.all = all;

	TontoDirectiveCollection.prototype.toString = toString; // This is required to override toString() on the prototype

	/* Private Instance Variables */

	var directives = [];

	/* Private Functions */

	function forEach(iteratorFunction) {
		directives.forEach(iteratorFunction);
	}

	function toString() {

		var directiveStrings = [];

		directives.forEach(getDirectiveString);

		function getDirectiveString(directive) {
			directiveStrings.push(directive.toString());
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
	 * @param  {string} address         [description]
	 * @param  {[type]} port            [description]
	 * @param  {[type]} directiveSetter [description]
	 * @return {[type]}                 [description]
	 */
	function virtualHost(address, port, directiveSetter) {

		var directiveCollection = new TontoDirectiveCollection();

		directiveSetter(directiveCollection);

		push(new Directive('VirtualHost', address + ':' + port, directiveCollection));

		return this;

	}

	function serverName(value) {}

	function header(value) {}

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