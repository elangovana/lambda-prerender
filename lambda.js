'use strict'
'use strict'
const prerender = require('prerender');
const prerenderServer = prerender({chromeLocation: "./node_modules/@serverless-chrome/lambda/dist/headless-chromium"});
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
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');


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
