/**
 * Class to  handel all the JSON Stuff like 
 * -view
 * -list
 */

const db = require('../db.js');
const utils = require("../utils.js");
class JSONHandler
{
    constructor()
    {

    }
    view(module,key,res)
    {
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

    }
    list(module,res)
    {
        db.list(module).then((data)=>
        {
            res.send(data);
        }).catch(()=>{
            res.send("404");
        });

    }
    handle(req,res)
    {
        var parts=req.params["0"].split("/");
        switch(parts[1])
        {
            case "view":
                this.view( parts[0],parts[2],res);
                break;
            case "list":
                this.list(parts[0],res);
                break;
            default:
                res.send("404")

        }
    }
}
module.exports=new  JSONHandler();