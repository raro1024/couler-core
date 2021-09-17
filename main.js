/**
 * Starts the main Server 
 */
var express = require('express');
const _db = require('./db.js');
const db= new _db();

var app = express();
let port = 8080;

//Standart json handler
app.get('/json/*', function(req, res) {

 var parts=req.params["0"].split("/");
 var module= parts[0];
 var key=parts[1];

 console.log(module);
 console.log(key);  
 if (module===undefined ||key ===undefined )
 {
     res.send("404")
 }
 else
 {
    console.log("send module"); 
    res.send("200")
 }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})