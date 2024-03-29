var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};


var qs = require('querystring');
var url = require('url');
var messages = [];

exports.handleRequest = function(request, response, html) {
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;
  var parseRoom = pathname.split('/');
  var roomName = parseRoom[parseRoom.length-1];
  var path = parseRoom[2];
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  if( path !== 'classes' ){
    response.writeHead(404, headers);
    response.end();
  }else{
    if(request.method === 'OPTIONS'){
      response.writeHead(statusCode, headers);
      response.end();
    }else if(request.method === 'GET'){
      // debugger
      response.writeHead(200, headers);
      response.end(JSON.stringify(messages));
    }else if(request.method === 'POST'){
      var message = '';
      request.on('data', function(data){
        message += data.toString();
      });
      request.on('end', function() {
        response.writeHead(201, headers);
        var ms = JSON.parse(message);
        messages.unshift(ms);
        response.end(JSON.stringify('ok'));
      });
    }
  }
};
