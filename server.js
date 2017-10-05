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
    handlers.getRequest(res, uri);
  
  } else if (method === 'POST') {
    req.on('data', (data) => {
      console.log('data', data.toString());
    });
  }

}).listen(PORT);

/* FUNCTIONS */

// function processPostRequest(request, route )