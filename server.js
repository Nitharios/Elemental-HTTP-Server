/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const fs = require('fs');
const path = require('path');
const handlers = require('./handlers/handlers');

const PORT = process.env.PORT || 8888;

let errorPath = '/error.html';
let format  = 'UTF-8';
let method, source, type, uri;

const server = http.createServer((req, res) => {
  console.log('Request Initiated');

  method = req.method;

  if (method === 'GET') {
    uri = req.url;      
    handlers.getFiles(res, uri);
  
  } else if (method === 'POST') {
    req.on('data', (data) => {
      console.log('data', data.toString());
    });
  }

}).listen(PORT);

/* FUNCTIONS */

// will take in the route requested and output the correct file
// function getFiles(response, route) {
//   // handles content type
//   if (route === '/css/styles.css') type = 'text/css';
//   else type = 'text/html';

//   // handles navigation to main page
//   if (route === '/') route = `/index.html`;

//   // sets the correct route to read from
//   source = path.join('public', route);

//   fs.readFile(source, format, (err, data) => {
//     // returns 404 page is there is a problem with reading the file
//     if (err) getFiles(response, errorPath);
    
//     // if there is data, include a 200 and Content-Type header in the reponse header
//     else if (data) {response.writeHead(200, {'Content-Type' : type});
//       // then write the data to the response
//       response.write(data, (err) => {
//         // if an error is thrown , this would be a server side error???
//         if (err) throw err;
//       });
        
//       response.end();
    
//     }
//   });
// }

// function processPostRequest(request, route )

function postFiles(response, route) {
  console.log('post');

  // fs.writeFile...

}