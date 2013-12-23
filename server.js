var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
   res.writeHeader(200, {"Content-type": "text/html"});

    fs.readFile("./" + req.url, "binary",  function(err, file) {
        if (err) {
            res.write("Sorry, the page that you are looking for does not seem to exist");
        } else {
            res.write(file, "binary");
        }

        res.end();
    });

});

server.listen(80);
