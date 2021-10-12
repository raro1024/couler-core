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
import { getstartUpTasks } from "./decerators";

const t0 = Date.now();
var request;

let port = 8080;

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers:{
        "toJSON":function(object){return JSON.stringify(object)},
        "renderBone":function(boneName,bone){
            if(bone)
            {
                return bone.renderer(boneName)
            }
            
        }
    }
}));
app.set('view engine', '.hbs');
getstartUpTasks().forEach(element => {
    console.log(element)
    element[0][element[1]]();
});

app.all("*",function(req, res,next) 
{
    request=req;
    next();
});
app.use('/static', express.static('static'));

app.use(filehandler.router)
//Standart json handler
app.use(jsonhandler.router);
//Standart html handler
app.use(htmlhandler.router);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    const t1 = Date.now();
    console.log(`Up in ${t1 - t0} milliseconds.`);
});
// Access the session as req.session
module.exports=function getRequestData(){return request;};
