var express = require('express');
var app = express();
var path = require('path');
 
var url = require('url'); // url parsing
var fs = require('fs'); // file system

var current_file, file, fileToCheck;
var server_started = false;

function compareFiles(file) {
    var tmp_file;
    fs.readFile(file, function(err, data) {
      if (!server_started) {
        current_file = data.toString();
        tmp_file = data.toString();
        server_started = true;
      }
      else {
        tmp_file = data.toString();

        var result = jsonEqual(tmp_file, current_file);
        //console.log(result);

        try {
          if (result) { 
            fs.writeFile('reload.txt', 'NO');
            //console.log("No reload"); 
          }
          else {  
            fs.writeFile('reload.txt', 'OK'); 
            //console.log("Reload");  
          }
        }

        catch(error) {
          console.error(error);
        }
      }

   
  });
}

function jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function fullUrl(req) {
  return url.format({
    //protocol: req.protocol,
    //host: req.get('host'),
    pathname: req.originalUrl
  });
}




// viewed at http://localhost:9000
app.get('/*', function(req, res) {
    let url_in = fullUrl(req);

    file = path.join(__dirname + '/'+url_in);
    let split = file.split(".");
    if (split[1] == "html" || split[1] == "htm") {
      fileToCheck = file;
      server_started = false;
      compareFiles(fileToCheck); // check to dynamic browser reload 
    }

    res.sendFile(file); // back ansver to client
});


setInterval(function() {
   if (fileToCheck) { compareFiles(fileToCheck); }
}, 1000);

app.listen(9000);