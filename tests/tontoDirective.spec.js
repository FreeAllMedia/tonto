var should = require('should'),
	util = require('util'),
	TontoDirective = require('../lib/tontoDirective.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection');

describe('TontoDirective(name, value, directives)', function () {

	var name,
		value,
		directives,
		directive;

	beforeEach(function () {
		name = 'VirtualHost';
		value = '*:80';
		directives = null;
	});

	describe('.render', function () {
		describe('with directives', function () {

			beforeEach(function () {
				directives = new TontoDirectiveCollection();
				directives.push(new TontoDirective('RewriteEngine', 'On'));
				directives.push(new TontoDirective('RewriteCond', '%{HTTPS} off'));
				directive = new TontoDirective(name, value, directives);
			});

			it('should generate as an SGML-style tag with each directive\'s properly tabbed .render() for content', function () {
				directive.render().should.equal('<VirtualHost *:80>\n\tRewriteEngine On\n\tRewriteCond %{HTTPS} off\n</VirtualHost>');
			});

		});

		describe('without options.directives', function () {
			beforeEach(function () {
				directive = new TontoDirective(name, value, directives);
			});
			
			it('should generate as a non-block directive', function () {
				directive.render().should.equal('VirtualHost *:80');
			});
		});
	});

});