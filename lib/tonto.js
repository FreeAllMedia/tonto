/**
 * ```
 *  _____ ___  _  _ _____ ___
 * |_   _/ _ \| \| |_   _/ _ \
 *   | || (_) | .` | | || (_) |
 *   |_| \___/|_|\_| |_| \___/.JS
 *  APACHE CONFIG FILE GENERATOR
 * ```
 * [![Build Status](https://travis-ci.org/FreeAllMedia/tonto.png?branch=master)](https://travis-ci.org/FreeAllMedia/tonto)
 * [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/tonto/badge.png?branch=master)](https://coveralls.io/r/FreeAllMedia/tonto?branch=master)
 * [![Code Climate](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/badges/8211b5ff104e1d7c1d51/gpa.png)](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/feed)
 *
 * ## Generate Apache Config Files With Tonto.js!
 *
 * ### Wait.. What? Why?!
 *
 * Because sometimes, templates either don't cut it, or you get sick of setting up templates. Behold: Tonto.js with support for 591 apache directives, without leaving the comfort of your Javascript couch.
 *
 * ### The Tonto Name
 *
 * The [Tonto (Dilzhę́’é) people](http://itcaonline.com/?page_id=1183) are one of the Western Apache groups from North America. Long ago, their enemies called them "foolish", "wild", "crazy", and "those who you don't understand" for speaking and doing things differently than their neighbors. Today they are know throughout art communities for their superior fine crafting.
 *
 * ### Use Case Examples
 *
 * 1. Server hosts can write a deployment script with Tonto.js to easily customize apache config files for new machines.
 * 2. Wrap this library with your own to provide an easy interface for generating all of your project's apache configs.
 * 3. Take your wife out for a nice steak dinner, then to a show that *she* wants to see. Tell her it was all made possible because you're smart and made time for her with Tonto.js.
 *
 * ## Using Tonto.js
 *
 * ```javascript
 *
 * var Tonto = require('./'),
 *  tonto = new Tonto();
 *
 * tonto.virtualHost('*:443', function (subDirectives) {
 *
 *  'use strict';
 *
 *     subDirectives
 *         .serverName('somesite.com')
 *         .header('set Access-Control-Allow-Origin "*"')
 *
 *         .directory('/var/node/somesite/current/public/', function (directoryDirectives) {
 *             directoryDirectives
 *                 .addOutputFilterByType('DEFLATE text/html text/plain text/xml text/css text/javascript application/x-javascript')
 *                 .browserMatch('\\bMSIE\\s6 no-gzip')
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
 *         .sslcertificateFile('/var/node/myApp/certificates/somehost_com.crt')
 *         .sslkeyFile('/var/node/myApp/certificates/somehost_com.key')
 *         .sslchainFile('/var/node/myApp/certificates/somehost_com_DigiCertCA.crt');
 *
 * });
 *
 * tonto.virtualHost('*:80', function (subDirectives) {
 *
 *  'use strict';
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
 * ```
 *
 * @class Tonto
 * @constructor
 */
module.exports = function Tonto() {

	'use strict';

	/* Dependencies */

	var DirectiveCollection = require('./tontoDirectiveCollection.js');

	/* Private Instance Variables */

	var self = this,
		directives = new DirectiveCollection();

	/* Instantiation */

	referenceDirectiveProperties(); // This copies references for each property on `directives` to `this`

	/* Private Functions */

	function referenceDirectiveProperties() {

		for (var functionName in directives) {

			if (directives.hasOwnProperty(functionName)) {

				self[functionName] = directives[functionName];

			}

		}

	}

};