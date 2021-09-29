/**
 * Handel the session stuff
 * 
 */


 import {db} from "./db";

 export function getSessionKey()
{
    const getRequestData =require("./main");
    var ssid = getRequestData().sessionID;
    
    return ssid ;
}
/**
 * Function to get the current user
 * @returns Promies
 */
export function getCurrentUser()
{
    const sessionpromise= db.read("sessions",{"sessionID": getSessionKey()});
    const userpromise= new Promise((resolve, reject)=>{
        sessionpromise.then((data)=>{
            console.log("has session")
            db.read("user",data["userkey"]).then((data)=>{
            resolve(data);
            })
    }).catch(err=>{
       reject();
    })
   
    });
    return userpromise;
   
}

export function setUserSession(userkey)
{
   
    const getRequestData =require("./main");
    var sessionID = getRequestData().sessionID;   
    db.toDB("sessions",{"sessionID":sessionID,"userkey":userkey});
}

export function isPostRequest()
{
    const getRequestData =require("./main");
    console.log(getRequestData()["method"])
    return getRequestData()["method"]==="POST"
}
export * as utils from "./utils";