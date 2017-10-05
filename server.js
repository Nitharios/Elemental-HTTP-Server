/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8888;

const files = {
  'index.html' : 'index.html',
  'helium.html' : 'helium.html',
  'hydrogen.html' : 'hydrogen.html',
  'styles.css' : 'css/styles.css'
};

let format  = 'UTF-8';
let method, source, uri;

const server = http.createServer((req, res) => {
  // console.log('req', req);
  // console.log('res', res);
  console.log('Someone connected!');

  method = req.method;

  if (method === 'GET') {
    console.log(method);
    uri = req.url;

    readDirectoryFiles(res, uri);

  }
}).listen(8888);

/* FUNCTIONS */

// will take in the path requested and output the correct file
function readDirectoryFiles(response, path) {
  
  if (path === '/') path = `index.html`;
  
  if (files.hasOwnProperty(path)) {
    if (path === 'styles.css') path = `css/${path}`;
    source = `./public/${path}`;
    console.log('source', source);
  }

  fs.readFile(source, format, (err, data) => {
    if (err) throw err;

  response.write(data.toString(), (err) => {
      if (err) throw err;

      response.end();
    });
  });
}