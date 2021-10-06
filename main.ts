/**
 * Starts the main Server 
 */
import * as express from "express";
const session = require('express-session');
var app = express();
app.use(session({ secret: "-", cookie: { maxAge: 60*60*1000 }}));
import * as jsonhandler from "./routes/json";
import * as htmlhandler from "./routes/html";
import * as filehandler from "./routes/file";
import * as exphbs from 'express-handlebars';


var request;
var userid = "6147824759f79e71d01ffc27";

let port = 8080;
var hbs = exphbs.create({extname: 'hbs'});
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.all("*",function(req, res,next) 
{
    request=req;
    next();
});

app.use(filehandler.router)
//Standart json handler
app.use(jsonhandler.router);
//Standart html handler
app.use(htmlhandler.router);


// Access the session as req.session


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports=function getRequestData(){return request;};