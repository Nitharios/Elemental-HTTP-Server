/* jshint esversion:6 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

let fileName, formData, htmlBody, newPath, parsedData;
// __dirname
let publicDir = './public/';

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
    formData = data.toString();
    // parses data into a collection of key and value pairs
    parsedData = qs.parse(formData);
    // sets path
    fileName = parsedData.elementName.toLowerCase() + '.html';
    newPath = path.join(publicDir, fileName);
    // sets HTML body
    htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${parsedData.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${parsedData.elementName}</h1>
  <h2>${parsedData.elementSymbol}</h2>
  <h3>Atomic number ${parsedData.elementAtomicNumber}</h3>
  <p>${parsedData.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`;

    fs.writeFile(newPath, htmlBody, (err) => {
      if (err) throw err;
      console.log('New element added!');
      response.end();
    });

  });
}

module.exports = postRequest;