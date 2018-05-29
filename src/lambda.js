'use strict'
const prerender = require('prerender');
const prerenderServerPort = '5000'
const prerenderServer = prerender({chromeLocation: "./node_modules/@serverless-chrome/lambda/dist/headless-chromium", 'port':prerenderServerPort, chromeFlags: ['--headless', ' --crash-dumps-dir=/tmp', '--no-sandbox', '--disable-gpu', '--window-size=1280,1696',
                   '--hide-scrollbars'
            , '--homedir=/tmp'
            , '--single-process'
            , '--data-path=/tmp/data-path'
            , '--disk-cache-dir=/tmp/cache-dir'
            ,'--ignore-certificate-errors','--remote-debugging-port=9222' ]});
const awsServerlessExpress = require('aws-serverless-express')
const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	"text/html"
]
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const format = require('string-format')
prerenderServer.start();
setup_appserver();

//This is regular aws serverless express
const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);


// Set up the express app server
function setup_appserver(){

	app.disable('x-powered-by');
	app.use(compression());

	app.get('*', prerenderServer.onRequest);

	//dont check content-type and just always try to parse body as json
	app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);

}
