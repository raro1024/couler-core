const stringBone = require('../bones/stringbone.js');

class Raw {
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



}
const r = new Raw();
r.classname()
r.getDataFromClient({"username":"arne"})
r.readSkelData({"username":"arne"})