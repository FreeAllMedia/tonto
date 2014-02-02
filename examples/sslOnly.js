var Tonto = require('../'),
	tonto = new Tonto();

tonto.virtualHost('*:443', function (subDirectives) {

	'use strict';

    subDirectives
        .serverName('somesite.com')
        .header('set Access-Control-Allow-Origin "*"')

        .directory('/var/node/somesite/current/public/', function (directoryDirectives) {
            directoryDirectives
                .addOutputFilterByType('DEFLATE text/html text/plain text/xml text/css text/javascript application/x-javascript')
                .browserMatch('\\bMSIE\\s6 no-gzip')
                .options('FollowSymLinks')
                .options('-MultiViews')
                .allowOverride('none')
                .order('allow, deny')
                .allow('from all');
        })

        .proxyPass('/ http://localhost:8080')
        .proxyPassReverse('/ http://localhost:8080')

        .sslcertificateFile('/var/node/myApp/certificates/somehost_com.crt')
        .sslcertificateKeyFile('/var/node/myApp/certificates/somehost_com.key')
        .sslcertificateChainFile('/var/node/myApp/certificates/somehost_com_DigiCertCA.crt');

});

tonto.virtualHost('*:80', function (subDirectives) {

	'use strict';

    subDirectives
        .serverName('somesite.com')
        .rewriteEngine('On')
        .rewriteBase('/myapp')
        .rewriteCond('%{HTTPS off}')
        .rewriteRule('(.*) http://somesite.com%{REQUEST_URI}');

});

console.log(tonto.render());