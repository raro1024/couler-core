/**
 * Starts the main Server 
 */
var express = require('express');
var session = require('express-session');
var app = express();
app.use(session({ secret: "-", cookie: { maxAge: 60*60*1000 }}));
const jsonhandler =  require('./routes/json.js');
const htmlhandler =  require('./routes/html.js');
var request;
var userid = "6147824759f79e71d01ffc27";

let port = 8080;
app.get("*",function(req, res,next) 
{
    console.log("Set user id 1")
    request=req;
    next();
});

//Standart json handler
app.use(jsonhandler);
//Standart html handler
app.use(htmlhandler);


// Access the session as req.session


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports=function getRequestData(){return request;};