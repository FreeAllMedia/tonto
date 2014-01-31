var should = require('should'),
	Tonto = require('../lib/tonto.js'),
	TontoDirectiveCollection = require('../lib/tontoDirectiveCollection.js');

describe('Tonto()', function () {

	'use strict';

	var tonto,
		tontoDirectiveCollection;

	beforeEach(function () {
		tonto = new Tonto();
		tontoDirectiveCollection = new TontoDirectiveCollection();
	});

	it('should share properties with a TontoDirectiveCollection instance', function () {
		Object.keys(tonto).should.eql(Object.keys(tontoDirectiveCollection));
	});

});