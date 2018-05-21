'use strict'
const prerender = require('prerender');
const prerenderServer = prerender({chromeLocation: "./node_modules/@serverless-chrome/lambda/dist/headless-chromium", 'port':'5000', chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars' ]});
const awsServerlessExpress = require('aws-serverless-express')
const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

//This is regular aws serverless express
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = (event, context) => {
	app.disable('x-powered-by');
	app.use(compression());
	app.get('*', prerenderServer.onRequest);
	app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);
	prerenderServer.start()
	return awsServerlessExpress.proxy(server, event, context)
}
