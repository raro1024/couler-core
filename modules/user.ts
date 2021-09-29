const stringBone = require('../bones/stringbone.js');


const Skeleton = require('../skeleton.js');

import { List } from "./list";
import {db} from "../db";
import {utils} from "../utils";
import {exposed} from "../decerators";



class UserSkel extends Skeleton {
    kindname="user" //For Routing and DB Shit
    constructor() {
        super();
        this.key = new stringBone(); //Set every time to find an User
        this.username = new stringBone();
        this.password = new stringBone();
        this.rand = new stringBone({default:"defaulttest"})
    }

}
class User extends List
{
    constructor() {
        super();
        console.log(this)
    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }

    getDataFromClient(data) {
        console.log("write data")
        for (const [key, value] of Object.entries(data)) {
             this[key].data=value;
        }

    }
    readSkelData()
    {
        console.log("reading data")
        for (const [key, value] of Object.entries(this)) {
             console.log(key,value.data)
        }
        return this
    }
    /**
     * Fill Skeleton with data
     * @param {string} key
     * @returns 
     */
     @exposed
    async fromDB({key})
    {
        var vals =db.read("user",key)
        return vals.then((data)=>{
            for (const [key, value] of Object.entries(data)) {
                this[key]=value
            }
            
        });
        
    }
    @exposed
    async login({data})
    {

        console.log("user login")
        var k =utils.getSessionKey();
        utils.setUserSession("6147824759f79e71d01ffc27")
        return "login - "+ k;
        
    }
   
    @exposed
    async add(data)
    {   
        console.log("add")
        console.log(data)
        
        return super.add(this.addSkel(),data);
    }
    //Create an Instace off the Userskel

    addSkel()
    {
        return new UserSkel();
    }
    
    test()
    {
        console.log("Fuck in")
        return "Fuck have access"
    }
}
module.exports=User