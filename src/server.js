const prerender = require('prerender');
const prerenderServer = prerender({ 'port':'5000', chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--hide-scrollbars','--remote-debugging-port=9222' ]});
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(compression());
app.get('*', prerenderServer.onRequest);
app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);

app.listen(3000, ()=> {console.log("Listening on 3000");})
prerenderServer.start();
submitSampleRequest();

function submitSampleRequest(){
	JSON.stringify(app);
	const http= require('http');

  http.get('http://localhost:5000/render?url=https://ahfarmer.github.io/calculator/', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	    console.log(data);
	  });

	})
	.on("error", (err) => {
  	console.log("Error: " + err.message);
	});
}
