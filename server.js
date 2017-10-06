/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const handlers = require('./handlers/handlers');
const PORT = process.env.PORT || 8888;

let method, uri;

const server = http.createServer((req, res) => {
  console.log('Request Initiated');

  uri = req.url.toLowerCase();
  method = req.method;

  switch (method) {
    case 'HEAD':
      handlers.headRequest(res, uri);
      break;
    case 'GET':
      handlers.getRequest(req, res, uri);
      break;
    case 'POST':
      handlers.postRequest(req, res, uri);
      break;
    default:
      handlers.getRequest(res, 'error');
  }

}).listen(PORT);

server.on('end', () => {
  console.log('Connection terminated');
});

/* FUNCTIONS */

// function processPostRequest(request, route )