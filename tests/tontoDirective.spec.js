var should = require('should'),
	util = require('util'),
	TontoDirective = require('../lib/tontoDirective.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection');

describe('TontoDirective(name, value, directives)', function () {

	'use strict';

	var name,
			value,
			subDirectives,
			directive;

	beforeEach(function () {
		name = 'Order';
		value = 'allow, deny';
		subDirectives = null;
		directive = new TontoDirective(name, value);
	});

	describe('.render', function () {

		describe('with sub-directives', function () {

			beforeEach(function () {
				name = 'Directory';
				value = '/some/directory/path/';
				subDirectives = new TontoDirectiveCollection();
				subDirectives.order('allow, deny');
				directive = new TontoDirective(name, value, subDirectives);
			});

			it('should render as an SGML-style tag with each sib-directive\'s properly tabbed .render() for content', function () {
				directive.render().should.equal('<Directory /some/directory/path/>\n\tOrder allow, deny\n</Directory>');
			});

		});

		describe('without sub-directives', function () {

			it('should render as solo directive', function () {
				directive.render().should.equal(name + ' ' + value);
			});
			
		});

	});

});