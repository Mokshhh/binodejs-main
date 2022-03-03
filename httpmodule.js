const http = require('http');
const fs = require('fs')
const port= 2000;
// the below function does the same job as app.use
http.createServer(function (req, res) {
    fs.readFile('/userdata', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end(JSON.stringify(response));
    });
  }).listen(port);