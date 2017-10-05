/* jshint esversion:6 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

let formData, parsedData, newPath;
// __dirname
let publicDir = '../public/';

/* FUNCTIONS */

function postRequest(request, response, data) {
  processPostRequest(request, response, data);  
  // fs.writeFile()
}

function processPostRequest(request, response, data) {
  // handles the body of data attached to POST request header
  // ASYNC so will continue to next function while still processing
  request.on('data', (data) => {
    // passes data to a variable as a string (otherwise it is a buffer)
    formData = data.toString().toLowerCase();
    // parses data into a collection of key and value pairs
    parsedData = qs.parse(formData);
    console.log(parsedData);

    // fs.writeFile();


    response.end();
  });
}

module.exports = postRequest;