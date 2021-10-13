import {
    Skeleton
} from "../skeleton";
import {
    List
} from "../prototypes/list";
import {
    db
} from "../db";
import {
    utils
} from "../utils";
import {
    exposed,
    startUpTask
} from "../decerators";
import {
    Error
} from "../errors";
import {
    stringBone
} from "../bones/stringBone";
import {
    passswordBone
} from "../bones/passwordBone";



class UserSkel extends Skeleton {
    kindname = "user"
    name: stringBone;
    password: passswordBone;
    access: stringBone;

    constructor() {
        super();
        this.name = new stringBone({
            required: true,
            unique: true
        });
        this.password = new passswordBone();
        this.access = new stringBone({
            multiple: true
        });
    }

}
export class User extends List {
    kindname = "user" //For Routing and DB Shit
    loginTemplate: string = "user_login.hbs"
    loginSuccessTemplate: string = "user_login_success.hbs"
    constructor() {
        super();
    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }

    getDataFromClient(data) {
        console.log("write data")
        for (const [key, value] of Object.entries(data)) {
            this[key].data = value;
        }

    }
    readSkelData() {
        console.log("reading data")
        for (const [key, value] of Object.entries(this)) {
            console.log(key, value.data)
        }
        return this
    }
    @exposed
    async login(data) {
        console.log("in login")
        if (!utils.isPostRequest()) {
            return this.render(this.loginTemplate);
        }
        var skel = this.loginSkel();
        await db.get("user", {
            "name": data["name"]
             },1).then(userdata => {
            if(userdata)
            {               
                console.log(skel);
                console.log(userdata);

                skel.writeBones(userdata)
            }
            else
            {
                throw new Error().notFound();
            }
           
        }).catch(() => {
            throw new Error().notFound();
        });
        if(skel.password.check(data["password"]))
        {
            console.log("login success")
            utils.setUserSession(skel.key.data);
            return this.render(this.loginSuccessTemplate,skel.readBones())
        }

    }
    @exposed
    async view({key})
    {


        if(key==="self")
        {
            const user =await utils.getCurrentUser()
        
            
            if (user)
            {
                this.viewSkel()
                return this.render(this.viewTemplate,user)
            }
            else
            {
                throw new Error().unauthorized();
            }
               
        }
    }
    @exposed
    async add(data) {
        console.log("add")
        console.log(data)
        return super.add(this.addSkel(), data);
    }

    //Create an Instace off the Skel
    addSkel() {
        return new UserSkel();
    }
    loginSkel() {
        return new UserSkel();
    }
    @startUpTask
    async createFirstUser() {
        if (!await db.get("user", {}, 1)) {
            let skel = this.addSkel();
            const passwordValue = utils.randomString(10);
            skel.name.data = "admin@exnode.com";
            skel.password.data = passwordValue;
            skel.access.data = "root"
            await skel.toDB().then(() => {
                console.log("#####################");
                console.log("New User created");
                console.log("Username: " + skel.name.data);
                console.log("Password: " + passwordValue);
                console.log("#####################");
            }).catch(() => {
                console.log("User can not be created")
            });
        }
    }
}