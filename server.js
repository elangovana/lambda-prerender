'use strict'
const prerender = require('prerender');
const server = prerender({chromeLocation: "./node_modules/@serverless-chrome/lambda/dist/headless-chromium"});
module.exports = server
