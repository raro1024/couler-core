const stringBone = require('../bones/stringbone.js');
const db = require('../db.js');
const utils = require('../utils.js');
const module_ = require('./module.js');



class UserSkel {
    constructor() {
        this.key = new stringBone(); //Set every time to find an User
        this.username = new stringBone();
        this.password = new stringBone();
    }

}
class User extends module_
{
    constructor() {
        super();
        console.log("Enter conster")
        console.log(this)
    }
    classname(_class = this) {
        console.log(_class.constructor.name)
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
    async fromDB(key)
    {
        var vals =db.fromDB("user",key)
        return vals.then((data)=>{
            for (const [key, value] of Object.entries(data)) {
                this[key]=value
            }
            
        });
        
    }
    async login(data)
    {

        console.log("user login")
        var k =utils.getSessionKey();
        console.log(k);
        utils.setUserSession("6147824759f79e71d01ffc27",k)
        return "login - "+ k;
        
    }
    /**
     * 
     * @param {string} key 
     *
     * @returns {object} Object of user
     * Function must clear Password out of the object 
     */
    async view(key)
    {

        if (key==="self")
        {
            var userpromise =  utils.getCurrentUser().then(data=>data);
        }
        else
        {
            var userpromise = db.read(this.classname(),key);
        }
        userpromise.then(user=>{
            delete user["password"];
        });
        
        return userpromise;
       
    }

    async add(data)
    {
        return super.add(this.classname(),data);
    }
}
module.exports=User