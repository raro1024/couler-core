/**
 * Starts the main Server 
 */
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { conf } from './conf';
var app = express();

import * as htmlhandler from "./routes/html";
import * as jsonhandler from "./routes/json";

conf["routes.json"]=jsonhandler;
conf["routes.html"]=htmlhandler;
//import * as filehandler from "./routes/file";
import * as exphbs from 'express-handlebars';
import {
    getstartUpTasks
} from "./decerators";
import * as utils from "./utils";
import * as initSkelton from"./skeletons/init";
import * as objectPath from "object-Path";

console.log("All modules are loded in index==>>");
const t0 = Date.now();
var request;

let port = 8080;

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        "toJSON": function (object) {
            return JSON.stringify(object)
        },
        "renderBone": function (boneName, bone) {
            
            if (bone) {
                return bone.renderer(boneName).outerHTML;
            }

        }
    }
}));
app.set('view engine', '.hbs');
getstartUpTasks().forEach(element => {
    element[0][element[1]]();
});


//Cookie Handeling
app.use(cookieParser())
app.all("*", (req, res, next) => {

    if (!req.cookies["exnode-uniqe-key"]) {
        res.cookie(`exnode-uniqe-key`, utils.randomString(30), {
            maxAge: 1000 * 60 * 60 * 24 * 7, // is set in ms
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        });
    }

    request = req;

    if (request._parsedUrl._raw !== "/favicon.ico") {
        next();
    } else {
        res.end("404");
    }

});
for (const [skelName, skel] of Object.entries(initSkelton)) {

    objectPath.set(conf,"skeletons."+new skel().kindname,skel)
}
app.use('/static', express.static('static'));

//app.use(filehandler.router)
//Standart json handler
app.use(jsonhandler.router);
//Standart html handler
app.use(htmlhandler.router);




module.exports={
    core:app,
    request:()=> { return request;}
};

// Access the session as req.session
