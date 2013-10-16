var http = require("http");
var hr = require('./request-handler.js');
var fs = require('fs');
var port = 8081;
var ip = "127.0.0.1";

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

var server = http.createServer(function(request, response) {
  console.log('request starting ...');
  var extname = path.extname(request.url);
  debugger;
  var contentType = 'text/html';
      switch (extname) {
      case '.js':
          contentType = 'text/javascript';
          fileName = './client/app.js'
          break;
      case '.css':
          contentType = 'text/css';
          break;
      }

  fs.readFile('js/EmailDisplay/htm/index.html', function(error, content) {
      if (error) {
          console.log(error);
          response.writeHead(500);
          response.end();
      } else {
          console.log(contentType);
          response.writeHead(200, {'Content-Type': contentType});
          response.end(content,'utf-8');
      }
});

});

server.listen(port, ip);
// var server = http.createServer(function(req, res){

// });
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);


/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
