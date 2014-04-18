var express = require('express');
var player = require('./player');
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