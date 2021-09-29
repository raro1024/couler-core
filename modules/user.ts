
import {Skeleton} from "../skeleton";
import { List } from "../prototypes/list";
import {db} from "../db";
import {utils} from "../utils";
import {exposed} from "../decerators";
import { stringBone } from "../bones/stringbone";
import { passswordBone } from "../bones/passwordbone";



class UserSkel extends Skeleton {
    kindname="user"
    name: stringBone;
    password: passswordBone;
    rand: stringBone;
   
    constructor() {
        super();
        this.name = new stringBone({required:true});
        this.password = new passswordBone();
        this.rand = new stringBone({defaultValue:"defaulttest"})
    }

}
export class User extends List
{
    kindname="user" //For Routing and DB Shit
    constructor() {
        super();
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
    async login(data)
    {
        if(!utils.isPostRequest())
        {
            throw "Post only"
        }
        console.log("user login")
        console.log(data)
        console.log(data["name"])
        var skel = this.loginSkel();
        await db.read("user",{"name":data["name"]}).then(userdata=>{skel.writeBones(userdata)});
        //skel.password.check(data["password"])
        console.log(skel.password.check(data["password"]))
        return skel.password.check(data["password"]);
        
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
    loginSkel()
    {
        return new UserSkel();
    }
    
    test()
    {
        console.log("Fuck in")
        return "Fuck have access"
    }
}