var qs = require('querystring');
var url = require('url');

exports.handleRequest = function(request, response) {
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;
  var query = parsedUrl.query;
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  var messages = [];
  var desiredResponse = {
    results: messages
  }


  if( pathname !== '/chatterbox' ){
    response.writeHead(404, headers);
  }else{
    if(request.method === 'OPTIONS'){
      response.writeHead(statusCode, headers);
      response.end();
    }else if(request.method === 'GET'){
      // debugger
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(desiredResponse));  
    }else if(request.method === 'POST'){
      debugger
      response.writeHead(statusCode, headers);
      var message = '';
      request.on('data', function(data){
        message += data;
      })
      request.on('end', function() {
        // console.log(qs.parse(message));
        var ms = qs.parse(message);
        // console.log(typeof ms);
        messages.push(ms);
        console.log(messages);
        response.end();
      });
    }
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};
