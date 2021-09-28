/**
 * Class to  handel all the JSON Stuff like 
 * -view
 * -list
 */

const modules = require("../modules/init");
class HTMLHandler
 {
     constructor()
     {
 
     }
    
     async handle(req,res)
     {
        var parts=req.params["0"].split("/");

        //Create Module instance
        var m =  new modules[parts[0]]();
        var d =await m[parts[1]]();
        res.send(d);
        //parts[0] Module

        
     }
 }
 module.exports=new  HTMLHandler ();