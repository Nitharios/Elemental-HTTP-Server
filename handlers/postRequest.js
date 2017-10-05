/* jshint esversion:6 */

const http = require('http');
const fs = require('fs');
const path = require('path');

/* FUNCTIONS */


function postRequest(request, response, data) {
  processPostRequest(request, response, data);  
  // fs.writeFile()
}

function processPostRequest(request, response, data) {
  request.on('data', (data) => {
    console.log('data', data.toString());
  });
}

module.exports = postRequest;