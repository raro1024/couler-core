/**
 * Handel the session stuff
 * 
 */


const db = require('./db.js');

function getSessionKey()
{
    const getRequestData =require("./main");
    var ssid = getRequestData().sessionID;
    
    return ssid ;
}
/**
 * Function to get the current user
 * @returns Promies
 */
function getCurrentUser()
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

function setUserSession(userkey)
{
   
    const getRequestData =require("./main");
    var sessionID = getRequestData().sessionID;   
    db.toDB("sessions",{"sessionID":sessionID,"userkey":userkey});
}

function isPostRequest()
{
    const getRequestData =require("./main");
    return getRequestData()["method"]=="POST"
}
module.exports=
{
    getCurrentUser,
    setUserSession,
    getSessionKey,
    isPostRequest,
};