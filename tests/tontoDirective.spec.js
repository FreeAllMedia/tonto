var should = require('should'),
	util = require('util'),
	TontoDirective = require('../lib/tontoDirective.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection');

describe('TontoDirective(name, value, options)', function () {

	var name,
		value,
		options,
		directive;

	beforeEach(function () {
		name = 'VirtualHost';
		value = '*:80';
		options = {};
		directive = new TontoDirective(name, value, options);
	});

	describe('.toString', function () {
		describe('with options.directives', function () {

			beforeEach(function () {
				options.directives = new TontoDirectiveCollection();
				options.directives.push(new TontoDirective('RewriteEngine', 'On'));
				options.directives.push(new TontoDirective('RewriteCond', '%{HTTPS} off'));
				directive = new TontoDirective(name, value, options);
			});

			it('should generate as an SGML-style tag with each directive\'s properly tabbed .toString() for content', function () {
				directive.toString().should.equal('<VirtualHost *:80>\n\tRewriteEngine On\n\tRewriteCond %{HTTPS} off\n</VirtualHost>');
			});

		});

		describe('without options.directives', function () {
			it('should generate as a non-block directive', function () {
				directive.toString().should.equal('VirtualHost *:80');
			});
		});
	});

});