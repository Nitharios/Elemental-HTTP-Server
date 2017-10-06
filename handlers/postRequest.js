/* jshint esversion:6 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const getRequest = require('./getRequest');

let type = 'application/json';
let publicDir = './public/';
let elementCount, fileName, formData, 
htmlBody, newLink, newPath, parsedData;

// __dirname

/* FUNCTIONS */

function postRequest(request, response) {
  // handles the body of data attached to POST request header
  // ASYNC so will continue to next function while still processing
  request.on('data', (data) => {
    // passes data to a variable as a string (otherwise it is a buffer)
    formData = data.toString();

    // parses data into a collection of key and value pairs
    parsedData = qs.parse(formData);

    // boron.html
    fileName = parsedData.elementName.toLowerCase() + '.html';
    
    fs.stat(`./public/${fileName}`, (err, stats) => {
      if (err) console.log(err);

      if (stats) {
        getRequest(response, 'error');

      } else {

        // public/boron.html
        newPath = path.join(publicDir, fileName);

        // sets HTML body
        htmlBody = htmlGenerator(parsedData);

        fs.writeFile(newPath, htmlBody, (err) => {
          if (err) throw err;

          response.writeHead(200, {
            'Content-Type' : `${type}`
          });

          response.write("{'success' : true}", (err) => {
            if (err) throw err;
      
            console.log('New element added!');
            // getRequest(response, fileName);
            response.end();
          });
        });
      }
    });
  });
}

function htmlGenerator(data) {
return `<!DOCTYPE html>
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
}

function indexRegenerator(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>The Elements</h1>
  <h2>These are all the known elements.</h2>
  <h3>These are ${elementCount}</h3>
  <ol>
    <li>
      <a href="/hydrogen.html">Hydrogen</a>
    </li>
    <li>
      <a href="/helium.html">Helium</a>
    </li>
    ${newLink}
  </ol>
</body>
</html>`;
}

function linkGenerator(link) {
return `    <li>
      <a href="/helium.html">Helium</a>
    </li>`;
}

module.exports = postRequest;