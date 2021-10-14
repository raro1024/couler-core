import * as express from "express";
import * as decerators from "../decerators";
import * as coremodules from "../modules/init";
const modulesPath = "../../modules/init";
var modules = {};
try {
    modules = require(modulesPath)
} catch (e) {}


import {
    Error
} from "../errors";

import {
    utils
} from "../utils";
export const name = "html" //name of The renderer
export const router = express.Router();
router.use(express.urlencoded({
    extended: true
}))
router.use((req, res, next) => {
    req["handlername"] = "html"; // Set the handler Namer
    next();
});

/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */

router.all(['/:module/:handler/:key', '/:module/:handler', '/:module/', "*"], (req, res) => {
    //Load Module
    var skelData = getParams(req);
    if(skelData)
    {
    var key = skelData["key"];
    delete skelData["key"];
    }
    

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
    if (Object.getPrototypeOf(m_.constructor).name.toLocaleLowerCase() == "singel") {
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
            m_[handlername]({key,skelData}).then((data) => {
                console.log("now send template")
                if (data) {
                    const template = data[0];
                    const skel = data[1];
                    const statusCode = 200;
                    if (data.length > 2) {
                        const statusCode = data[2];
                    }

                    render({
                        template,
                        skel,
                        statusCode,
                        res
                    })
                } else {
                    render({
                        template: "index.hbs",
                        res: res
                    });
                }


            }).catch((error) => {
                console.log("!!!ERR!!!")
                console.log(error)
                const template = error[0];
                const skel = error[1];
                const statusCode = error[2];
                render({
                    template,
                    skel,
                    statusCode,
                    res
                })

            });
            break
        case "Function":
            try {
                let [template, skel] = m_[handlername]({key,skelData})
                render({
                    template,
                    skel,
                    res: res
                })

            } catch (error) {
                console.log(error)
                //handleError(res, error);
            }
            res.end(m_[req.params.handler]({key,skelData}).toString())
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
    console.log(req.params)
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
    throw "Module Not Found in request"

}

function render({
    template = "index.hbs",
    skel = {},
    statusCode = 200,
    res = null
} = {}) {
    res.statusCode = statusCode;
    if (!template) {
        res.send("no template ")
    }
    if (utils.isArray(skel)) {
        res.render(template, {
            layout: false,
            skellist: skel

        });

    } else {
        console.log("send ??");
        
        res.render(template, {
            layout: false,
            skel: skel

        });

    }

}

export * as html from "./html";