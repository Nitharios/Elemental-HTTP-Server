/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8888;

let format  = 'UTF-8';
let method, source, type, uri;

const server = http.createServer((req, res) => {
  console.log('Request Initiated');

  method = req.method;

  if (method === 'GET') {
    uri = req.url;
    readDirectoryFiles(res, uri);
  }

}).listen(PORT);

/* FUNCTIONS */

// will take in the path requested and output the correct file
function readDirectoryFiles(response, path) {
  // handles content type
  if (path === '/css/styles.css') type = 'text/css';
  else type = 'text/html';

  // handles navigation
  if (path === '/') path = `/index.html`;

  source = `./public${path}`;

  fs.readFile(source, format, (err, data) => {
    if (err) {
      // gets rid of the favicon error and shoves it to console
      console.log(err);
    }
    
    if (data) {response.writeHead(200, {'Content-Type' : `${type}`});
      response.write(data, (err) => {

        if (err) throw err;
      });
        
      response.end();
    
    }
  });
}