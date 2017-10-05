/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8888;

let errorPath = '/error.html';
let format  = 'UTF-8';
let method, source, type, uri;

const server = http.createServer((req, res) => {
  console.log('Request Initiated');

  method = req.method;

  if (method === 'GET') {
    uri = req.url;
    getFiles(res, uri);
  
  } else if (method === 'POST') {
    postFiles(res, uri);
  }

}).listen(PORT);

/* FUNCTIONS */

// will take in the path requested and output the correct file
function getFiles(response, path) {
  // handles content type
  if (path === '/css/styles.css') type = 'text/css';
  else type = 'text/html';

  // handles navigation to main page
  if (path === '/') path = `/index.html`;

  // sets the correct path to read from
  source = `./public${path}`;

  fs.readFile(source, format, (err, data) => {
    // returns 404 page is there is a problem with reading the file
    if (err) getFiles(response, `${errorPath}`);
    
    else if (data) {response.writeHead(200, {'Content-Type' : `${type}`});
      response.write(data, (err) => {

        if (err) throw err;
      });
        
      response.end();
    
    }
  });
}

function postFiles(response, path) {
  console.log('post');

  // fs.writeFile...

}