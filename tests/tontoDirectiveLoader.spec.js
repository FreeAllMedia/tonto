// var should = require('should'),
// 	sinon = require('sinon'),
// 	yaml = require('js-yaml'),
// 	path = require('path'),
// 	fs = require('fs'),
// 	changeCase = require('change-case'),
// 	TontoDirective = require('../lib/tontoDirective.js'),
// 	TontoDirectiveLoader = require('../lib/tontoDirectiveLoader.js');

// describe('TontoDirectiveLoader()', function () {

// 	'use strict';

// 	describe('Static Functions', function () {

// 		describe('TontoDirectiveLoader.attachFunctionsToObject(filePath, object)', function () {

// 			var directivesFilePath = path.join(__dirname, '../apacheDirectives.yml'),
// 				directivesFileContents = fs.readFileSync(directivesFilePath).toString(),
// 				apacheDirectives = yaml.load(directivesFileContents),
// 				groupDirectives = apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') !== -1); }),
// 				soloDirectives = apacheDirectives.filter(function (directiveName) { return (directiveName.indexOf('<') === -1); });

			

// 			it('should create directive functions on supplied `object`', function () {

// 			});

// 		});

// 	});

// });