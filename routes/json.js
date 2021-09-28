const e = require('express');
const express = require('express');
const router = express.Router();

const db = require('../db.js');
const utils = require("../utils.js");
/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */
router.get('/json/:module/:handler/*', (req, res)=>{
    //Load Module
    var module_;
    try{
        module_=require("../../modules/"+req.params.module);
    }catch(e){}
    if (module_===undefined)
    {
         module_= require("../modules/"+req.params.module);
    }
    const m_=new module_();
    const handler=m_[req.params.handler];
    if (handler===undefined)
    {
        res.end("404 Handler not Found")
        return;
    }
    switch(handler.constructor.name)
    {
        case "AsyncFunction":
                m_[req.params.handler](req.params["0"]).then((data)=>{
                if(typeof data==="object")
                {
                    res.json(data)
                    res.end()
                }
                else
                {
                    res.end(data)
                }
                
            })
            break
        case "Function":
            res.end(handler(req.params["0"]))
            break

    }
});
router.post("/json/:module/add/*", (req, res)=>{

});


module.exports = router;