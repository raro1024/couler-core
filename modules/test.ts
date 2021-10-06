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
    exposed
} from "../decerators";
import {
    Error
} from "../errors";
import {
    stringBone
} from "../bones/stringbone";
import {
    passswordBone
} from "../bones/passwordbone";
import {
    recordBone
} from "../bones/recordBone";
import {
    Tree
} from "../prototypes/tree";
import { conf } from "../conf";
import { fileBone } from "../bones/fileBone";


class TestSkel extends Skeleton {
    kindname = "test"
    name: stringBone;
    fileTest: stringBone;

    constructor() {
        super();
        //this.testRecord = new recordBone({using:TestRecordSkel});
        this.name = new stringBone({descr:"test descr"});
        this.fileTest = new stringBone({required:true});

    }

}
export class Test extends List {
    constructor() {
        super();
    }
    @exposed
    async add(data) {
        console.log("post adta")
        console.log(data)
        return super.add(this.addSkel(), data);
    }
    //Create an Instace off the Skel
    addSkel() {
        const skel = new TestSkel();
        delete skel.kindname;
        return skel
    }
    @exposed
    async test({key,one,two})
    {
       console.log("in test")
       console.log(key,one,two)
       console.log(arguments[0])
       return arguments
    }
    
}