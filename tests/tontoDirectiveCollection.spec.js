var should = require('should'),
	sinon = require('sinon'),
	TontoDirective = require('../lib/tontoDirective.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection.js');

describe('TontoDirectiveCollection()', function () {

	var collection,
		directiveOne,
		directiveTwo;

	beforeEach(function () {
		collection = new TontoDirectiveCollection();
		directiveOne = new TontoDirective('RewriteEngine', 'On');
		directiveTwo = new TontoDirective('RewriteCond', '%{HTTPS} off');
	});

	describe('.virtualHost(address, port, directiveSetter)', function () {

		var address,
			port,
			directiveSetter;

		beforeEach(function () {
			address = 'somehost.com';
			port = 80;
			directiveSetter = function (directives) {
				directives.push(directiveOne);
			};
		});

		it('should add a virtual host directive to the directive collection', function () {
			collection.virtualHost(address, port, directiveSetter);
			collection.all()[0].name.should.equal('VirtualHost');
		});

		it('should return `this`', function () {
			collection.virtualHost(address, port, directiveSetter).should.equal(collection);
		});

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

	describe('.toString()', function () {

		beforeEach(function () {
			collection.push(directiveOne);
			collection.push(directiveTwo);
		});

		it('should return all Directive strings, concatenated by two newlines', function () {
			collection.toString().should.equal('RewriteEngine On\nRewriteCond %{HTTPS} off');
		});

	});

});

	// function virtualHost(address, port, directiveSetter) {

	//     directives.virtualHost(address, port, directiveSetter);
	// }

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