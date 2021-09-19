/**
 * Starts the main Server 
 */
var express = require('express');

const jsonhandler =  require('./handler/json.js');



var app = express();
let port = 8080;

//Standart json handler
app.get('/json/*', function(req, res) {
    jsonhandler.handle(req,res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})