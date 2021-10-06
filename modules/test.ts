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

class TestRecordSkel extends Skeleton {
    testBone: stringBone;
    testBone1: stringBone;
    constructor() {
        super();
        this.testBone = new stringBone();
        this.testBone1 = new stringBone();
    }
}

class TestSkel extends Skeleton {
    kindname = "test"
    name: stringBone;
    fileTest: fileBone;

    constructor() {
        super();
        //this.testRecord = new recordBone({using:TestRecordSkel});
        this.name = new stringBone();
        this.fileTest = new fileBone();

    }

}
export class Test extends List {
    constructor() {
        super();
    }
    @exposed
    async add(data) {
        return super.add(this.addSkel(), data);
    }
    //Create an Instace off the Skel
    addSkel() {
        return new TestSkel();
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