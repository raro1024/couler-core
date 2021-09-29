import * as express from "express";
import * as decerators from "../decerators";
export const router = express.Router();

/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */
router.use(express.urlencoded({extended: true}))
router.use(express.json())
router.all(['/json/:module/:handler/*','/json/:module/:handler','/json/:module/'], (req, res)=>{
    //Load Module
    var params=getParams(req);
    var module_;
    try{
        module_=require("../../modules/"+req.params.module);
    }catch(e){}
    if (module_===undefined)
    {
         module_= require("../modules/"+req.params.module);
    }
    const m_=new module_();

    var  handlername:string=req.params.handle;
    var handler=m_[handlername];
    

    if (handler===undefined || handlername== undefined) // hander is not set try defaul list handler
    {
        handlername="list";
        handler=m_[handlername]
       
        if (handler===undefined)
        {
            throw "No list"
        }
    }
    if(!decerators.isExposed(m_,handler.name))//Check if Function is Exposed if not break;
    {
        throw "404";
    }
    switch(handler.constructor.name)
    {   
        case "AsyncFunction":
                m_[handlername](params).then((data)=>{
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
            res.end(m_[req.params.handler](params))
            break

    }
});
function getParams(req)
{
    if(req.query===undefined || Object.keys(req.query).length==0)
    {
        if(req.body)
        {
            return req.body;
        }
        return {key:req.params["0"]}
    }
    else
    {
        return req.query
    }
}

export * as json from "./json";