var express = require('express');
var player = require('./player');
var os = require('os');
var app = express();


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res){
    console.log(req.query.torrent)
    player.playTorrent(req.query.torrent, function(href){
        res.send(href);
        console.log("Ping: ", href);
    });
});

app.listen(3000);


var interfaces = os.networkInterfaces();
var addresses = [];
for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log("Server running on:", addresses.toString()+".", "Set this IP in your TV app (frontend/player.js line 8)");