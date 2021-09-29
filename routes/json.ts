import * as express from "express";
import * as decerators from "../decerators";
import * as coremodules from "../modules/init";
import * as modules from "../../modules/init"; //Err if not exist but its ok :D
import {Error} from "../errors";

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
router.all(['/json/:module/:handler/*', '/json/:module/:handler', '/json/:module/'], (req, res) => {
    //Load Module
    var params = getParams(req);
    var module_ = getModule(req);
    console.log(module_)
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
            m_[handlername](params).then((data) => {
                if (typeof data === "object") {
                    res.json(data)
                    res.end()
                } else {
                    res.end(data.toString())
                }

            }).catch((error)=>{
                if(typeof error=="function")
                {
                    var errorData=error()
                    res.status(errorData[0])
                    res.end(errorData[1])
                }
                else{
                    res.end(error.toString());
                }
            });
            break
        case "Function":
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

    if (req.params.module === undefined) {
        console.log(req.params.module)
        throw "Module Not Found"
    }
    for (const [modulename, module_] of Object.entries(modules)) {
        if (req.params.module.toLocaleLowerCase() === modulename.toLocaleLowerCase()) {
            return module_
        }
    }

    for (const [modulename, module_] of Object.entries(coremodules)) {
        if (req.params.module.toLocaleLowerCase() === modulename.toLocaleLowerCase()) {
            return module_
        }

    }
    throw "Module Not Found"


}
export * as json from "./json";