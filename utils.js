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
    sessionpromise.then((data)=>{
        console.log(data);
        db.read("user",data["userkey"]).then((data)=>{
            return data;
        })
    }).catch(err=>{
        return undefined;
    })
    return sessionpromise
   
}
function setUserSession(userkey)
{
   
    const getRequestData =require("./main");
    var sessionID = getRequestData().sessionID;   
    db.toDB("sessions",{"sessionID":sessionID,"userkey":userkey});
}

module.exports=
{
    getCurrentUser,
    setUserSession,
    getSessionKey
};