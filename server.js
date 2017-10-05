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

const server = http.createServer((req, res) => {
  console.log('req', req);
  console.log('res', res);

  res.write('Hello User!');
  res.end();

});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/* FUNCTIONS */

// will take in the path requested and output the correct file
function readDirectoryFiles(response, path) {
  fs.readFile(path, (data, err) => {
    if (err) throw err;

    else if (files.hasOwnProperty(path)) response.write(data);
  });
}