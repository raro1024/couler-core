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
function getCurrentUser()
{
    const getRequestData =require("./main");
    var ssid = getRequestData().sessionID;
    
    return ssid ;
}
function setUserSession(userkey)
{
   
    const getRequestData =require("./main");
    var sessionID = getRequestData().sessionID;   
    var data 
    db.toDB("sessions",{"sessionID":sessionID,"userkey":userkey});
}

module.exports=
{
    getCurrentUser,
    setUserSession,
    getSessionKey
};