const express = require('express');
const router = express.Router();

const db = require('../db.js');
const utils = require("../utils.js");
router.get('/json/:module/:handler/*', (req, res)=>{
    //Load Module
    console.log()
    const module= require("../modules/"+req.params.module);
    module[req.params.handler](req.params["0"])
    res.end("1");
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