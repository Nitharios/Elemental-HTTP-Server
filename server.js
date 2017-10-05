/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const handlers = require('./handlers/handlers');
const PORT = process.env.PORT || 8888;

let method, uri;

const server = http.createServer((req, res) => {
  console.log('Request Initiated');

  method = req.method;

  switch (method) {
    case 'HEAD':
      handlers.headRequest(res, uri);
      break;
    case 'GET':
      uri = req.url;
      handlers.getRequest(res, uri);
      break;
    case 'POST':
      req.on('data', (data) => {
        console.log('data', data.toString());
      });
      break;
    default:
      handlers.getRequest(res, 'error');
  }

}).listen(PORT);

/* FUNCTIONS */

// function processPostRequest(request, route )