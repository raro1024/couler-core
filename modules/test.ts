import {
    Skeleton,
    RefSkeleton
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
import {
    conf
} from "../conf";
import {
    fileBone
} from "../bones/fileBone";
import {
    numericBone
} from "../bones/numericBone";
import {
    dateBone
} from "../bones/dateBone";
import {
    booleanBone
} from "../bones/booleanBone";
import { selectBone } from "../bones/selectBone";

class RefRefTest extends RefSkeleton {
    stringtestinRecord: stringBone;
    constructor() {
        super();
        this.stringtestinRecord = new stringBone({
            multiple: true

        });
    }
}
class RefTest extends RefSkeleton {
    stringtestinRecord: stringBone;
    recordinRecordtest: recordBone;
    constructor() {
        super();
        this.stringtestinRecord = new stringBone({
            multiple: true

        });
    }
}


class TestSkel extends Skeleton {
    kindname = "test"
    filetest: fileBone;

    constructor() {
        super();
        this.filetest=new fileBone();
    }

}
export class Test extends List {
    constructor() {
        super();
    }
    @exposed
    async add(data) {
        console.log("IN ADD OF TEST")
        return super.add(this.addSkel(), data);
    }
    //Create an Instace off the Skel
    addSkel() {
        return new TestSkel();
    }

}