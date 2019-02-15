var express = require('express');
var app = express();
var path = require('path');

// url parsing
var url = require('url');

function fullUrl(req) {
  return url.format({
    //protocol: req.protocol,
    //host: req.get('host'),
    pathname: req.originalUrl
  });
}

// viewed at http://localhost:8080
app.get('/*', function(req, res) {
    let url_in = fullUrl(req);
    console.log(url_in);
    res.sendFile(path.join(__dirname + '/'+url_in));
    
});

app.listen(8080);