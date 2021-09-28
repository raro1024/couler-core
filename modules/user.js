const stringBone = require('../bones/stringbone.js');
const db = require('../db.js');
const utils = require('../utils.js');
const List = require('./list.js');



class UserSkel {
    constructor() {
        this.key = new stringBone(); //Set every time to find an User
        this.username = new stringBone();
        this.password = new stringBone();
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
    async fromDB({key})
    {
        var vals =db.fromDB("user",key)
        return vals.then((data)=>{
            for (const [key, value] of Object.entries(data)) {
                this[key]=value
            }
            
        });
        
    }
    async login({data})
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
    async view({key})
    {
        console.log("params are")
        console.log(key)
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
        }).catch((err)=>{return err});
        
        return userpromise;
       
    }

    async add({data})
    {
        return super.add(this.classname(),data);
    }
}
module.exports=User