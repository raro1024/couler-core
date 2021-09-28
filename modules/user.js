const stringBone = require('../bones/stringbone.js');
const db = require('../db.js');
const utils = require('../utils.js');

class UserSkel {
    constructor() {
        this.key = new stringBone(); //Set every time to find an User
        this.username = new stringBone();
        this.password = new stringBone();
    }

    classname(_class = this) {
        console.log(_class.constructor.name)
        console.log(_class["username"])
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
    toDB()
    {
        console.log("Write data to DB")
        db.toDB("user",this)

    }
    /**
     * Fill Skeleton with data
     * @param {string} key
     * @returns 
     */
    async fromDB(key)
    {
        console.log("Get data form DB")
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
        return "123";
    }



}
module.exports=UserSkel