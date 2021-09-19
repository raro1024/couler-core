const stringBone = require('../bones/stringbone.js');
const _db = require('../db.js');
const db= new _db();
class UserSkel {
    constructor() {
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
    }
    toDB()
    {
        console.log("Write data to DB")
        db.toDB("user",this)

    }
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



}
module.exports=UserSkel