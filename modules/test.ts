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
} from "../bones/stringBone";
import {
    passswordBone
} from "../bones/passwordBone";
import {
    recordBone
} from "../bones/recordBone";
import {
    Tree
} from "../prototypes/tree";
import { conf } from "../conf";
import { fileBone } from "../bones/fileBone";
import { numericBone } from "../bones/numericBone";


class TestSkel extends Skeleton {
    kindname = "test"
    name: stringBone;
    stringtest: stringBone;
    numtest: numericBone;
    passwordtest: passswordBone;

    constructor() {
        super();
        //this.testRecord = new recordBone({using:TestRecordSkel});
        this.stringtest = new stringBone();
        //this.numtest = new numericBone();
        //this.passwordtest = new passswordBone();

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