var express = require('express'),
    app = express(),
    path = require("path"),
    server =  require('http').createServer(app),
    port = process.env.PORT || 3000;


    server.listen(port, function() {
        console.log('listening on :', port);
    });

console.log(path.join(__dirname, '\public'));
    app.use(express.static(path.join(__dirname, '\public')));
