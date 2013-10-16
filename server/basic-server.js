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

  if(request.url.indexOf('.html') !== -1){

    fs.readFile('./client/index.html', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/html';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });

  }

  if(request.url.indexOf('.css') !== -1){

    fs.readFile('./client/styles/styles.css', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/css';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });

  }

  if(request.url.indexOf('.js') !== -1){

    fs.readFile('./client/bower_components/jquery/jquery.min.js', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/javascript';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });


    fs.readFile('./client/scripts/app.js', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/javascript';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });

    fs.readFile('./client/scripts/config.js', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/javascript';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });

    fs.readFile('./client/bower_components/underscore/underscore-min.js', function (err, data) {
      if (err) console.log(err);
      defaultCorsHeaders['Content-Type'] = 'text/javascript';
      response.writeHead(200, defaultCorsHeaders);
      response.write(data);
      response.end();
    });

  }
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
