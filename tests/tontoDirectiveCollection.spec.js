var should = require('should'),
	sinon = require('sinon'),
	yaml = require('js-yaml'),
	path = require('path'),
	fs = require('fs'),
	util = require('util'),
	Interface = require('methodical'),
	changeCase = require('change-case'),
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

	describe('Dynamic Function', function () {

		var directivesFilePath = path.join(__dirname, '../apacheDirectives.yml'),
			directivesFileContents = fs.readFileSync(directivesFilePath).toString(),
			apacheDirectives = yaml.load(directivesFileContents),
			groupDirectives = apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); }),
			soloDirectives = apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); }),
			value = 'Some Value';

		describe('Group Directives', function () {

			var subDirectiveSetter;

			beforeEach(function () {
				subDirectiveSetter = function (subDirectives) {
					subDirectives.push(directiveOne);
				};
			});

			groupDirectives.forEach(function (directiveName) {

				var functionName = changeCase.camelCase(directiveName.replace(/[<>]/, ''));

				describe(functionName + '(value, subDirectiveSetter)', function () {

					it('should exist on the collection', function () {
						collection.should.have.ownProperty(functionName);
					});

					it('should add a ' + directiveName + ' directive to the collection', function () {
						collection[functionName](value, subDirectiveSetter);
						collection.all()[0].name.should.equal(directiveName);
					});

					describe('subDirectiveSetter(tontoDirectiveCollection)', function () {

						var subDirectiveSetterSpy;

						beforeEach(function () {
							subDirectiveSetterSpy = sinon.spy(subDirectiveSetter);
						});

						it('should call subDirectiveSetter with a sub-directive TontoDirectiveCollection as the only parameter', function () {
							collection[functionName](value, subDirectiveSetterSpy);
							subDirectiveSetterSpy.args[0][0].should.be.instanceOf(TontoDirectiveCollection);
						});

						it('should call subDirectiveSetter only once', function () {
							collection[functionName](value, subDirectiveSetterSpy);
							subDirectiveSetterSpy.calledOnce.should.be.true;
						});

					});

					it('should return a copy of the collection for chaining', function () {
						collection[functionName](value, subDirectiveSetter).should.equal(collection);
					});

				});

			});

		});

		describe('Solo Directives', function () {

			soloDirectives.forEach(function (directiveName) {

				var functionName = changeCase.camelCase(directiveName.replace(/[<>]/, ''));

				describe(functionName + '(value)', function () {

					it('should exist on the collection', function () {
						collection.should.have.ownProperty(functionName);
					});

					it('should add a ' + directiveName + ' directive to the collection', function () {
						collection[functionName](value);
						collection.all()[0].name.should.equal(directiveName);
					});

					it('should return a copy of the collection for chaining', function () {
						collection[functionName](value).should.equal(collection);
					});

				});

			});

		});

	});

});