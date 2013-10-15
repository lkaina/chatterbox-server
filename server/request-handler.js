/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var qs = require('querystring');
var url = require('url');

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log('request url: '+request.url);
  /* "Status code" and "headers" are HTTP concepts that you can
   * research on the web as and when it becomes necessary. */
  var statusCode = 200;

  /* Without this line, this server wouldn't work.  See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);
  if (request.method === 'GET'){
    var json;
    debugger; 
    var urlString = {
      pathname: url.parse(request.url).pathname,
      queryparam: qs.parse(url.parse(request.url).query)
    };
    if (urlString.queryparam.callback && urlString.queryparam.callback != '?') {
      json = urlString.queryparam.callback + "(" + json + ");";
    }
    response.end(json);
  }
  else if (request.method === 'OPTIONS'){
    response.end();
  }

  else if (request.method === 'POST'){
    var body = '';
    request.on('data', function(data) {
      debugger;
      body += data.toString();
      if (data.length > 1e7) {
        response.writeHead(413, "Request Too Large",  {'Content-Type': 'text/html'});
        response.end('<!doctype html><html><head><title>413</title></head></html>');
      }
    });
    request.on('end', function(){
      response.end();
    });
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id",
  "access-control-max-age": 10 // Seconds.
};
