const express = require('express');
const router = express.Router();

const db = require('../db.js');
const utils = require("../utils.js");
/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 */
router.get('/json/:module/:handler/*', (req, res)=>{
    //Load Module
    console.log(req.params.handler)
    const module= require("../modules/"+req.params.module);
    const handler=new module()[req.params.handler];
    switch(handler.constructor.name)
    {
        case "AsyncFunction":
            handler(req.params["0"]).then((data)=>{res.send(data)})
            break
        case "Function":
            res.send(handler(req.params["0"]))
            break
    }
    
    
   
});
router.get('/json/:module/view/:key', (req, res)=>{
    var module=req.params.module;
    var key=req.params.key;
    if(key==="self")
    {
        console.log("try to get current user");
        console.log("id="+utils.getCurrentUser());

        res.send(utils.getCurrentUser());
        return;
    }
    db.read(module,key).then((data)=>
    {
        res.send(data);
    }).catch(()=>{
        res.send("404");
    });
});
module.exports = router;