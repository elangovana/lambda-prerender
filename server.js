const prerender = require('prerender');
const prerenderServer = prerender({'port':'5000'});
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(compression());
app.get('*', prerenderServer.onRequest);
app.post('*', bodyParser.json({ type: () => true }), prerenderServer.onRequest);

app.listen(3000, ()=> {console.log("Listening on 3000");})

prerenderServer.start()
