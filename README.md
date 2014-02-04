```
 _____ ___  _  _ _____ ___
|_   _/ _ \| \| |_   _/ _ \
  | || (_) | .` | | || (_) |
  |_| \___/|_|\_| |_| \___/.JS
 APACHE CONFIG FILE GENERATOR
```
[![Build Status](https://travis-ci.org/FreeAllMedia/tonto.png?branch=master)](https://travis-ci.org/FreeAllMedia/tonto)
[![Coverage Status](https://coveralls.io/repos/FreeAllMedia/tonto/badge.png?branch=master)](https://coveralls.io/r/FreeAllMedia/tonto?branch=master)
[![Code Climate](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/badges/8211b5ff104e1d7c1d51/gpa.png)](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/feed)

## Generate Apache Config Files With Tonto.js!

### Wait.. What? Why?!

Becuase sometimes you want to generate apache config files without leaving the comfort of javascript.

### The Tonto Name

The [Tonto (Dilzhę́’é) people](http://itcaonline.com/?page_id=1183) are one of the Western Apache groups from North America. Long ago, their enemies called them "foolish", "wild", "crazy", and "those who you don't understand" for speaking and doing things differently than their neighbors. Today they are know throughout art communities for their superior fine crafting.

### Use Case Examples

1. Server hosts could write a deployment script with Tonto.js that easily customizes an apache config files for each new machine.
2. Wrap Tonto.js with your own library to provide an easy interface for generating your proprietary apache configurations with arguments.
3. Take your wife out for a nice steak dinner, then to a show that *she* wants to see. Tell her it was all made possible because you're smart and made time for her with Tonto.js.

## Installation

```shell
$ npm install tonto --save
```

## Using Tonto.js

```javascript
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
```
