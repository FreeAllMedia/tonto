/**
 * ```
 *  _____ ___  _  _ _____ ___  
 * |_   _/ _ \| \| |_   _/ _ \ 
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 * [![Build Status](https://travis-ci.org/FreeAllMedia/tonto.png?branch=master)](https://travis-ci.org/FreeAllMedia/tonto)
 * [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/tonto/badge.png)](https://coveralls.io/r/FreeAllMedia/tonto)
 * [![Code Climate](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/badges/8211b5ff104e1d7c1d51/gpa.png)](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/feed)
 * 
 * ## Generate Apache Config Files With Tonto.js!
 *
 * ### Wait.. What? Why?!
 *
 * Because sometimes we want to automate the generation of apache config files to a greater degree than with simple templating.
 *
 * ### The Tonto Name
 *
 * The Tonto (Dilzhę́’é) Apache people are one of the Western Apache groups from North America. Long ago, their enemies called them "foolish", "wild", "crazy", and "those who you don't understand" for speaking and doing things differently than their neighbors.
 *
 * ### Use Case Examples:
 *
 * 1. You have many servers to deploy, all with slightly different apache configurations. Use Tonto.js to write a simple script that generates the appropriate apache config upon deployment!
 * 2. Automate detection of an application's requirements with a custom script, then generate a custom apache config based upon those requirements with Tonto.js!
 * 3. Take your wife out for a nice steak dinner, then to a show that *she* wants to see. Tell her it was all made possible because you're smart and made time for her with TONTO.JS!
 * 
 * ## How It Works:
 *
 * ```javascript
 * var tonto = new Tonto();
 * 
 * tonto.virtualHost('*', 443, function (subDirectives) {
 *
 *     subDirectives
 *         .serverName('somesite.com')
 *         .header('set Access-Control-Allow-Origin "*"')
 *         
 *         .directory('/var/node/somesite/current/public/', function (directoryDirectives) {
 *             directoryDirectives
 *                 .addOutputFilterByType('DEFLATE text/html text/plain text/xml text/css text/javascript application/x-javascript')
 *                 .browserMatch('\bMSIE\s6 no-gzip')
 *                 .options('FollowSymLinks')
 *                 .options('-MultiViews')
 *                 .allowOverride('none')
 *                 .order('allow, deny')
 *                 .allow('from all');
 *         })
 *
 *         .proxyPass('/ http://localhost:8080')
 *         .proxyPassReverse('/ http://localhost:8080')
 *
 *         .sslCertificateFile('/var/node/myApp/certificates/somehost_com.crt')
 *         .sslKeyFile('/var/node/myApp/certificates/somehost_com.key')
 *         .sslChainFile('/var/node/myApp/certificates/somehost_com_DigiCertCA.crt');
 *         
 * });
 *
 * tonto.virtualHost('*', 80, function (subDirectives) {
 *
 *     subDirectives
 *         .serverName('somesite.com')
 *         .rewriteEngine('On')
 *         .rewriteBase('/myapp')
 *         .rewriteCond('%{HTTPS off}')
 *         .rewriteRule('(.*) http://somesite.com%{REQUEST_URI}');
 *     
 * });
 *
 * var configFileContents = tonto.render();
 * 
 * ```
 *                                                              
 * @class Tonto
 * @constructor
 */
module.exports = function Tonto() {

	'use strict';

	/* Dependencies */

	var Directive = require('./tontoDirective.js'),
		DirectiveCollection = require('./tontoDirectiveCollection.js');

	/* Public Interface */

	referenceDirectiveProperties(this);

	/* Private Instance Variables */

	var directives = new DirectiveCollection();

	/* Private Functions */

	function referenceDirectiveProperties(context) {
		for (var functionName in directives) {
			if (directives.hasOwnProperty(functionName)) {
				context[functionName] = directives[functionName];
			}
		}
	}

	/**
	 * Export apache config file to string
	 * @method toString
	 */
	function toString() {

	}

};