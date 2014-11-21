var express = require('express');
var app = express();
var port = process.env.PORT || 8001;

app.use(express.static(__dirname + "/dist/"));
app.listen(port);

console.log('Please go to http://localhost:' + port + ' to test your popcorntime');