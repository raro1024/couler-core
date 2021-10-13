/**
 * Handel the session stuff
 * 
 */


import {db} from "./db";
import { html } from "./routes/html";
import { json } from "./routes/json";
import * as coremodules from "./modules/init";
const modulesPath= "../modules/init";
var modules={};
try {
    modules=require(modulesPath)
}catch(e){}

 export function getSessionKey()
{
    const getRequestData =require("./index");
    var ssid = getRequestData().sessionID;
    
    return ssid ;
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
                db.get("user",data["userkey"]).then((data)=>{resolve(data);})
            }
            else{
                resolve(null)
            }
            
    }).catch(err=>{
       reject();
    })
   
    });
    return userpromise;
   
}

export function setUserSession(userkey)
{
   
    const getRequestData =require("./index");
    var sessionID = getRequestData().cookies["exnode-uniqe-key"];   
    db.put("sessions",{"sessionID":sessionID,"userkey":userkey});
}

export function isPostRequest()
{
    const getRequestData =require("./index");
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
    var handlerDict={"json":json,"html":html}
    return handlerDict[getCurrentRenderName()];
}
export function getCurrentRenderName()
{
    const getRequestData =require("./index");
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
export * as utils from "./utils";