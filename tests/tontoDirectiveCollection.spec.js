var should = require('should'),
	sinon = require('sinon'),
	TontoDirective = require('../lib/tontoDirective.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection.js');

describe('TontoDirectiveCollection()', function () {

	'use strict';

	var collection,
		directiveOne,
		directiveTwo;

	beforeEach(function () {
		collection = new TontoDirectiveCollection();
		directiveOne = new TontoDirective('RewriteEngine', 'On');
		directiveTwo = new TontoDirective('RewriteCond', '%{HTTPS} off');
	});

	describe('.forEach(iteratorFunction)', function () {

		beforeEach(function () {
			collection.push(directiveOne);
			collection.push(directiveTwo);
		});

		it('should iteratively call iteratorFunction with each directive in the collection', function () {
			var iteratorFunction = sinon.spy();
			collection.forEach(iteratorFunction);

			iteratorFunction.calledWith(directiveOne).should.equal(true);
			iteratorFunction.calledWith(directiveTwo).should.equal(true);
		});

	});

	describe('.all()', function () {

		beforeEach(function () {
			collection.push(directiveOne);
			collection.push(directiveTwo);
		});

		it('should return all directives in an array', function () {
			collection.all().should.eql([directiveOne, directiveTwo]);
		});

	});

	describe('.render()', function () {

		beforeEach(function () {
			collection.push(directiveOne);
			collection.push(directiveTwo);
		});

		it('should return all Directive strings, concatenated by two newlines', function () {
			collection.render().should.equal('RewriteEngine On\nRewriteCond %{HTTPS} off');
		});

	});

	describe('.virtualHost(address, port, directiveSetter)', function () {

		var address,
			port,
			directiveSetter;

		beforeEach(function () {
			address = '10.10.9.1';
			port = 80;
			directiveSetter = function (directives) {
				directives.push(directiveOne);
			};
			collection.virtualHost(address, port, directiveSetter);
		});

		it('should add a virtual host directive to the directive collection', function () {
			collection.all()[0].name.should.equal('VirtualHost');
		});

		it('should render a valid virtual host directive', function () {
			collection.render().should.equal('<VirtualHost 10.10.9.1:80>\n\t' + directiveOne.render() + '\n</VirtualHost>');
		});

		it('should return `this` to enable chaining', function () {
			collection.virtualHost(address, port, directiveSetter).should.equal(collection);
		});

	});

	describe('.serverName(address)', function () {

		var address;

		beforeEach(function () {
			address = 'somehost.com';
			collection.serverName(address);
		});

		it('should render a valid virtual host directives', function () {
			collection.render().should.equal('ServerName ' + address);
		});

		it('should add a ServerName directive to the directive collection', function () {
			collection.all()[0].name.should.equal('ServerName');
		});

		it('should return `this` to enable chaining', function () {
			collection.serverName(address).should.equal(collection);
		});

	});

	describe('.header(value)', function () {

		var value;

		beforeEach(function () {
			value = 'set Access-Control-Allow-Origin "*"';
			collection.header(value);
		});

		it('should render a valid virtual host directives', function () {
			collection.render().should.equal('Header ' + value);
		});

		it('should add a Header directive to the directive collection', function () {
			collection.all()[0].name.should.equal('Header');
		});

		it('should return `this` to enable chaining', function () {
			collection.header(value).should.equal(collection);
		});

	});

	

});

	// function serverName(value) {}

	// function header(value) {}

	// function directory(directoryPath, directivesSetter) {}

	// function addOutputFilterByType(value) {}

	// function browserMatch(value) {}

	// function options(value) {}

	// function allowOverride(value) {}

	// function order(value) {}

	// function allow(value) {}

	// function proxyPass(path, url) {}

	// function proxyPassReverse(path, url) {}

	// function proxyPassMatch(path, url) {}

	// function sslCertificateFile(certificatePath) {}

	// function sslKeyFile(certificatePath) {}

	// function sslChainFile(certificatePath) {}