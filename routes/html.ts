import * as express from "express";
import * as decerators from "../decerators";
import * as coremodules from "../modules/init";
import * as modules from "../../modules/init"; //Err if not exist but its ok :D
import {
    Error
} from "../errors";
import * as ejs from 'ejs'; // For the templates
import * as path from 'path';
export const name = "html" //name of The renderer
export const router = express.Router();
router.use(express.urlencoded({
    extended: true
}))
router.use((req, res, next) => {
    req["handlername"] = "html"; // Set the handler Namer
    next();
})
/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */

router.all(['/:module/:handler/*', '/:module/:handler', '/:module/', "*"], (req, res) => {
    //Load Module
    var params = getParams(req);
    var module_: any = getModule(req);
    const m_ = new module_();

    var handlername: string = req.params.handler;
    var handler = m_[handlername];

    if (Object.getPrototypeOf(m_.constructor).name.toLocaleLowerCase() == "list") { // Check if Parent class is list
        if (handler === undefined || handlername == undefined) // hander is not set try defaul list handler
        {
            handlername = "list";
            handler = m_[handlername]

            if (handler === undefined) {
                throw "No list"
            }
        }
    }
    if (Object.getPrototypeOf(m_.constructor).name.toLocaleLowerCase() == "singel")
    {
        if (handler === undefined || handlername == undefined) // hander is not set try defaul list handler
        {
            handlername = "view";
            handler = m_[handlername]
            if (handler === undefined) {
                throw "No view"
            }
        } 
    } 
    if (!decerators.isExposed(m_, handler.name)) //Check if Function is Exposed if not break;
    {
        throw "No exposed";
    }
    switch (handler.constructor.name) {
        case "AsyncFunction":
            m_[handlername](params).then((data) => {
                res.end(data.toString());

            }).catch((error) => {
                handleError(res, error);

            });
            break
        case "Function":
            try {
                res.end(m_[handlername](params).toString())

            } catch (error) {
                handleError(res, error);
            }
            res.end(m_[req.params.handler](params).toString())
            break

    }
});

function getParams(req) {
    if (req.query === undefined || Object.keys(req.query).length == 0) {
        if (req.body) {
            return req.body;
        }
        return {
            key: req.params["0"]
        }
    } else {
        return req.query
    }
}

function getModule(req) {

    var requestmodule: string;
    if (req.params.module === undefined || "") {

        requestmodule = "index";
    } else {
        requestmodule = req.params.module.toLocaleLowerCase();
    }
    for (const [modulename, module_] of Object.entries(modules)) {
        if (requestmodule === modulename.toLocaleLowerCase()) {
            return module_
        }
    }

    for (const [modulename, module_] of Object.entries(coremodules)) {
        if (requestmodule === modulename.toLocaleLowerCase()) {
            console.log(module_)
            return module_
        }

    }
    throw "Module Not Found"

}

function handleError(res, error) {
    switch (typeof error) {
        case "function": // Errors Function
            var errorData = error()
            res.status(errorData[0])
            res.end(errorData[1])
            break;
        case "object": //JSON Err msg
            res.json(error)
            res.end()
            break;
        default:
            res.end(error.toString());
            break
    }
}

export async function render(filename, data = {}) {
    return await new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, '../views/' + filename), {
            data: data
        }, function (err, str) {
            if (err) {
                reject(err)
            } else {

                resolve(str);
            }

        })
    }).then((data) => data);
}

export * as html from "./html";