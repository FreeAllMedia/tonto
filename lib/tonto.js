/**
 * @class Tonto
 * @constructor
 * 
 * Tonto.toString({
 *     vhosts: [
 *         {
 *             ip: '*',
 *             port: 443,
 *             serverName: 'somesite.com',
 *             header: 'set Access-Control-Allow-Origin "*"',
 *             directory: {
 *               path: '/var/node/somesite/current/public/',
 *               addOutputFilterByType: 'DEFLATE text/html text/plain text/xml text/css text/javascript application/x-javascript',
 *               browserMatch: '\bMSIE\s6 no-gzip',
 *               options: [
 *                 'FollowSymLinks',
 *                 '-MultiViews'
 *               ],
 *               allowOverride: 'none',
 *               order: 'allow, deny',
 *               allow: 'from all'
 *             },
 *             proxy: {
 *                 pass: {
 *                     '/': 'http://localhost:8080'
 *                 },
 *                 passReverse: {
 *                     '/': 'http://localhost:8080'
 *                 }
 *             },
 *             ssl: {
 *                 certificateFile: '/var/node/myApp/certificates/somehost_com.crt',
 *                 keyFile: '/var/node/myApp/certificates/somehost_com.key',
 *                 chainFile: '/var/node/myApp/certificates/somehost_com_DigiCertCA.crt'
 *             }
 *         },
 *         {
 *             ip: '*',
 *             port: 80,
 *             serverName: 'somesite.com',
 *             rewrite: {
 *                 cond: '%{HTTPS} off',
 *                 rule: '(.*) https://somesite.com%{REQUEST_URI}'
 *             }
 *         }
 *     ]
 * });
 * ```
 */

function Tonto() {

	/* Static Interface */

	Tonto.toString = toString;

	/* Private Functions */

	function toString(options) {

	}

}