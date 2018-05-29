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
const http= require('http');
const format = require('string-format')
prerenderServer.start();

//This is regular aws serverless express
exports.handler = (event, context, callback) => {
	// app.disable('x-powered-by');
	// app.use(compression());
	// app.get('*', prerenderServer.onRequest);
	// app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);

	const url = event["url"];

  const prerender_url = 'http://localhost:{}/render?url={}'.format(prerenderServerPort, url)
  http.get(prerender_url, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
			console.log("Test Complete success.." );
			const successResponse = {
	        statusCode: 200,
          body: data,
	        headers: {}
	    }
			context.succeed( successResponse);
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
		context.succeed( sucessFailed);
	});

}
