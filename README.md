```
 _____ ___  _  _ _____ ___
|_   _/ _ \| \| |_   _/ _ \
  | || (_) | .` | | || (_) |
  |_| \___/|_|\_| |_| \___/.JS
 APACHE CONFIG FILE GENERATOR
```
[![NPM version](https://badge.fury.io/js/tonto.png)](http://badge.fury.io/js/tonto)
[![Build Status](https://travis-ci.org/FreeAllMedia/tonto.png?branch=master)](https://travis-ci.org/FreeAllMedia/tonto)
[![Coverage Status](https://coveralls.io/repos/FreeAllMedia/tonto/badge.png?branch=master)](https://coveralls.io/r/FreeAllMedia/tonto?branch=master)
[![Code Climate](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/badges/8211b5ff104e1d7c1d51/gpa.png)](https://codeclimate.com/repos/52eb567fe30ba03a3200228b/feed)

[![Dependency Status](https://david-dm.org/FreeAllMedia/tonto.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/tonto?theme=shields.io)
[![Dev Dependency Status](https://david-dm.org/FreeAllMedia/tonto/dev-status.svg)](https://david-dm.org/FreeAllMedia/tonto?theme=shields.io#info=devDependencies)

# Tonto.js

This library helps with automating the generation of Apache web server configuration files. It provides a native camelCased javascript function API which support all native (and native mod) configuration directives from Apache versions **2.4**, **2.2**, and **2.0**:

* [**591** Directives For Apache 2.4](http://httpd.apache.org/docs/2.4/mod/directives.html)
* [**416** Directives For Apache 2.2](http://httpd.apache.org/docs/2.2/mod/directives.html)
* [**361** Directives For Apache 2.0](http://httpd.apache.org/docs/2.0/mod/directives.html)

Additionally, Tonto is easily configured at instantiation to support any custom directive that you may have, (such as 3rd-party mod directives like 'PassengerRoot').

## The Name "Tonto"

This library is named after the [Tonto (Dilzhę́’é) people](http://itcaonline.com/?page_id=1183), who are one of the Western Apache groups from North America. Long ago, their enemies called them "foolish", "wild", "crazy", and "those who you don't understand" for speaking and doing things differently than their neighbors. Today, they are know throughout the art communities for their superior fine crafting.

## Installation

**Use NPM to install the `tonto` package into your node.js project:**

```shell
$ npm install tonto --save
```

## Getting Started

**1. Each instance of Tonto is a version-specific apache config _document object_ that you add directives to by calling it's _directive functions_:**

```javascript
var tonto = new Tonto('2.4');
```

**2. There are _solo directive functions_ that take a single value argument, and _block directive functions_ which take a _sub-directive setter_ object as the second argument:**

```javascript
tonto.serverName('somesite.com');
```

```javascript
tonto.virtualHost('*:80', function (subDirectiveDocument) {
  // Here, you can call any directive function directly on subDirectiveDocument, and it will be added as a sub-directive.
  subDirectiveDocument.serverName('somesite.com');
});
```

**3. When the _document object_ has all directives added to it, you can render the document to string by calling:**

```javascript
tonto.render();
```

**4. All directives are chainable:**

```javascript
var renderedDocument = tonto
  .loadModule('some_module /some/path/to/module.so')
  .serverSignature('Off')
  .traceEnable('Off')
  .render();
```

## Directive Functions

### Specifying an Apache Version

Tonto.js comes with built-in support for all native (and native mod) directives in versions **2.4**, **2.2**, and **2.0**. Additionally, you can specify any number of extra directives.

You specify which version you want to use during instantiation of the constructor:

```javascript
var twoFour = Tonto('2.4');
Object.keys(twoFour).length; // 594

var twoTwo = Tonto('2.2');
Object.keys(twoTwo).length; // 419

var twoZero = Tonto('2.0');
Object.keys(twoZero).length; // 364
```

### Directive/Function Case Differences

Whereas Apache directives are typed in **TitleCase**, tonto converts each of the directives into **camelBackCase** named functions.

**For example:**

  * `LoadModule` is added to the document with: `.loadModule('some_module /some/path/to/module.so')`
  * `SSLCertificateKeyFile` is added to the document with: `.sslCertificateKeyFile('/some/path/to/some_key.pem')`
  * `VirtualHost` is added to the document with: `.virtualHost('*:80', subDirectiveSetter)`

### Sub-Directive Setter

Block directives require a function as the second argument. This function has one argument itself, which is a clean sub-document. You can call any directive from the main document on a sub-document.

Here is an example of a sub-directive setter defined as a named function:

```javascript
tonto.virtualHost('*:80', subDirectiveSetter);

function subDirectiveSetter(subDirectives) {
  subDirectives.serverName('somesite.com');
}
```

This example will render:

```apache
<VirtualHost *:80>
  ServerName somesite.com
</VirtualHost>
```

### Defining Custom Directives

If you are using a 3rd party mod that provides custom directives, there is an easy way to extend tonto.js with custom functions for this purpose:

```javascript
tonto.extend([
  'CustomDirective',
  '<CustomBlock>'
]);

tonto.customDirective('some value'); // Solo directive

tonto.customBlock('some value', function (subDirectives) {
  // Because CustomBlock is surrounded in < and >, it is processed as a block directive
});
```
