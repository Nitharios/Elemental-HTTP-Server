/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8888;

const server = http.createServer((req, res) => {
  console.log('req', req);
  console.log('res', res);

  res.write('Hello User!');
  res.end();

});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});