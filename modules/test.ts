import {
    Skeleton,RefSkeleton
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

class RefRefSkelTest extends RefSkeleton {
    stringtestRecord : stringBone;
    numtestRecord : numericBone;
    recrtest : recordBone;

    constructor() {
        super();
        this.stringtestRecord = new stringBone();
        this.numtestRecord  = new numericBone();
    }
}

class TestRecordSkel extends RefSkeleton {
    stringtestRecord : stringBone;
    numtestRecord : numericBone;
    recordinrecord : recordBone;

    constructor() {
        super();
        this.stringtestRecord = new stringBone();
        this.numtestRecord  = new numericBone();
        this.recordinrecord=new recordBone({using:RefRefSkelTest,parent:this});
    }
}

class TestSkel extends Skeleton {
    kindname = "test"
    name: stringBone;
    stringtest: stringBone;
    numtest: numericBone;
    passwordtest: passswordBone;
    datetest: dateBone;
    recordtest: recordBone;

    constructor() {
        super();
        this.recordtest = new recordBone({using:TestRecordSkel,parent:this});
        this.stringtest = new stringBone();
        this.numtest = new numericBone({descr:"Ok num test"});
        this.passwordtest = new passswordBone();
        this.datetest = new dateBone();

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