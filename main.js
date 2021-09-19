/**
 * Starts the main Server 
 */
var express = require('express');
const _db = require('./db.js');

const jsonhandler =  require('./handler/json.js');
const db= new _db();


var app = express();
let port = 8080;

//Standart json handler
app.get('/json/*', function(req, res) {
    res.send(jsonhandler.handle(req,res))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})