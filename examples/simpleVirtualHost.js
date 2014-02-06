var Tonto = require('../'),
	tonto = new Tonto();

tonto.virtualHost('*:80', function (subDirectives) {

	subDirectives
		.serverName('somesite.com')
		.directory('/var/node/somehost.com/current/public/', function (directoryDirectives) {
			directoryDirectives
				.allowOverride('none')
				.order('allow, deny')
				.allow('from all');
		});

});

console.log(tonto.render());