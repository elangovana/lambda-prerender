'use strict'
const prerender = require('prerender');
const prerenderServer = prerender({chromeLocation: "./node_modules/@serverless-chrome/lambda/dist/headless-chromium", 'port':'5000', chromeFlags: ['--headless', ' --crash-dumps-dir=/tmp', '--no-sandbox', '--disable-gpu', '--window-size=1280,1696',
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
prerenderServer.start();

//This is regular aws serverless express
exports.handler = (event, context, callback) => {
	app.disable('x-powered-by');
	app.use(compression());
	app.get('*', prerenderServer.onRequest);
	app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);
	console.log("About to start prerenderServer .. aka Headless chrome");

	console.log("Started prerenderServer ..");
	console.log("Testing if the prerender is working..");
	const url = event["url"];

	const http= require('http');

  http.get('http://localhost:5000/render?url='+url, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	    console.log(data);
			console.log("Test Complete success.." );
			const successResponse = {
	        statusCode: 200, // "DNS resolution, TCP level errors, or actual HTTP parse errors" - https://nodejs.org/api/http.html#http_http_request_options_callback
	        body: data,
	        headers: {}
	    }
			context.succeeded( successResponse);
	  });

	})
	.on("error", (err) => {
  	console.log( "Error: " + err.message);
		console.log("Test Complete with error.." );
		callback("Error: " + err.message, data)
		const sucessFailed = {
				statusCode: 502, // "DNS resolution, TCP level errors, or actual HTTP parse errors" - https://nodejs.org/api/http.html#http_http_request_options_callback
				body: err.message,
				headers: {}
		}
		context.succeeded( sucessFailed);
	});

}
