/**
 * Handel the session stuff
 * 
 */


import {db} from "./db";

import { conf } from "./conf";



import * as coremodules from "./modules/init";
const modulesPath= "/modules/init";
var modules={};
try {
    modules=require(modulesPath);
}catch(e){}

export function getSessionKey()
{
    const getRequestData =require("./index").request;
    return getRequestData().cookies["exnode-uniqe-key"];    ;

}
/**
 * Function to get the current user
 * @returns Promies
 */


export function getCurrentUser()
{
    const sessionpromise= db.get("sessions",{"sessionID": getSessionKey()});
    const userpromise= new Promise((resolve, reject)=>{
        sessionpromise.then((data)=>{
            if(data)
            {
                console.log("foudnd key")
                db.get("user",data["userkey"]).then((data)=>{resolve(data);})
            }
            else{
                resolve(null)
            }
            
    }).catch(err=>{
        console.log(err);
       reject();
    })
   
    });
    return userpromise;
   
}

export function setUserSession(userkey)
{
   
    const getRequestData =require("./index").request;
    var sessionID = getRequestData().cookies["exnode-uniqe-key"];   
    db.put("sessions",{"sessionID":sessionID,"userkey":userkey});
}

export function isPostRequest()
{
    const getRequestData =require("./index").request;
    console.log(getRequestData()["method"])
    return getRequestData()["method"]==="POST"
}
export function randomString(length:number=20) // THX https://stackoverflow.com/a/1349426
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}
/**
 * 
 * @returns The current renderer
 */
export function getCurrentRender()
{
    var handlerDict={"json":conf["routes.json"],"html":conf["routes.html"]}
    return handlerDict[getCurrentRenderName()];
}
export function getCurrentRenderName()
{
    const getRequestData =require("./index").request;
    return getRequestData().handlername;
}
export function isEmpty(obj)
{
    return Object.keys(obj).length === 0;
}
export function isArray (a) {
    return (!!a) && (a.constructor === Array);
};
export function getCurrentModuleName()
{
    var requestmoduleName: string;
    const req =require("./index")();
    
    if (req.params.module === undefined || "") {

        requestmoduleName = "index";
    } else {
        requestmoduleName = req.params.module.toLocaleLowerCase();
    }
    return requestmoduleName;

}
export function getParams(req) {
    const module = req.params.module;
    const handler = req.params.handler;
    const key = req.params.key;
    var params = {}
    
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
export * as utils from "./utils";