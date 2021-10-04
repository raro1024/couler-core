
import {Skeleton} from "../skeleton";
import { List } from "../prototypes/list";
import {db} from "../db";
import {utils} from "../utils";
import {exposed} from "../decerators";
import {Error} from "../errors";
import { stringBone } from "../bones/stringbone";
import { passswordBone } from "../bones/passwordbone";



class UserSkel extends Skeleton {
    kindname="user"
    name: stringBone;
    password: passswordBone;
    rand: stringBone;
   
    constructor() {
        super();
        this.name = new stringBone({required:true,unique:true});
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
        await db.get("user",{"name":data["name"]}).then(userdata=>{skel.writeBones(userdata)}).catch(()=>{
            throw new Error().notFound;
        });
        return skel.password.check(data["password"]);
        
    }
   
    @exposed
    async add(data)
    {   
        console.log("add")
        console.log(data)
        return super.add(this.addSkel(),data);
    }

    //Create an Instace off the Skel
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