import * as express from "express";
import * as decerators from "../decerators";
import * as coremodules from "../modules/init";
const modulesPath = "../../modules/init";

var modules = {};
try {
    console.log("Load Modules");
    modules = require(modulesPath);
    console.log("Loaded Modules are =>");
    console.log(modules);
} catch (e) {
    console.log("Error=>")
    console.log(e);
}

import {
    Error
} from "../errors";
export const name = "json" //name of The renderer
export const router = express.Router();

/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())
router.use((req, res, next) => {
    req["handlername"] = "json"; // Set the handler Namer
    next();
})
router.all(['/json/:module/:handler/:key', '/json/:module/:handler', '/json/:module/', "/json*"], (req, res) => {
    //Load Module
    var params = getParams(req);
    var module_: any = getModule(req);
    const m_ = new module_();

    var handlername: string = req.params.handler;
    var handler = m_[handlername];


    if (handler === undefined || handlername == undefined) // hander is not set try defaul list handler
    {
        handlername = "list";
        handler = m_[handlername]

        if (handler === undefined) {
            throw "No list"
        }
    }
    if (!decerators.isExposed(m_, handler.name)) //Check if Function is Exposed if not break;
    {
        throw "404";
    }
    switch (handler.constructor.name) {
        case "AsyncFunction":
            console.log("params")
            console.log(params)
            console.log(handlername)
            m_[handlername](params).then((data) => {
                if (typeof data === "object") {
                    res.json(data)
                    res.end()
                } else {
                    res.end(data.toString())
                }

            }).catch((error) => {
                handleError(res, error)

            });
            break
        case "Function":
            try {
                res.json(m_[handlername](params))
                res.end()
            } catch (error) {
                handleError(res, error)
            }
            res.end(m_[req.params.handler](params).toString())
            break

    }
});

function getParams(req) {
    const module = req.params.module;
    const handler = req.params.handler;
    const key = req.params.key;
    var params = {}
    if (module) {
        if (handler) {
            if (key) {
                params["key"] = key;
            }
            if (req.query !== undefined || Object.keys(req.query).length > 0) {
                for (const [key_, val] of Object.entries(req.query)) {
                    params[key_] = val;
                }

            }
            if (req.body !== undefined || Object.keys(req.body).length > 0) {
                for (const [key_, val] of Object.entries(req.body)) {
                    params[key_] = val;
                }
            }
            return params;
        }
        return
    }
    return
}

function getModule(req) {

    var requestmodule: string;
    console.log("req.params.module")
    console.log(req.params.module)
    if (req.params.module === undefined || "") {
        console.log("set index");

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
export async function render(data = {}) {
    console.log("in json ")
    return data;
}


export * as json from "./json";