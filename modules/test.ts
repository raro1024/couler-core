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
    datetest1: dateBone;
    datetest2: dateBone;
    datetest3: dateBone;

    constructor() {
        super();
        this.datetest1=new dateBone({});
        this.datetest2=new dateBone({time:true});
        this.datetest3=new dateBone({time:true,date:false});
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