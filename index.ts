/**
 * Starts the main Server 
 */
import * as express from "express";
import * as session from "express-session";
import * as cookieSession from "cookie-session";
import * as cookieParser from "cookie-parser";

var app = express();

import * as jsonhandler from "./routes/json";
import * as htmlhandler from "./routes/html";
import * as filehandler from "./routes/file";
import * as exphbs from 'express-handlebars';
import {
    getstartUpTasks
} from "./decerators";
import {
    utils
} from "./utils";

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
                return bone.renderer(boneName)
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

    if (req._parsedUrl._raw !== "/favicon.ico") {
        next();
    }
    else
    {
        res.end("404");
    }

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
module.exports = function getRequestData() {
    return request;
};