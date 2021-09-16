var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
let port = 8080;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})