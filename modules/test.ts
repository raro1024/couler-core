import {
    Skeleton,
    RefSkeleton
} from "../skeleton";
import * as seckey from "../seckey"
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
    exposed, startUpTask
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
    edittest: stringBone;


    constructor() {
        super();
        this.edittest=new stringBone();
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
    @exposed
    async edit(data) {
        return super.edit(this.editSkel(),data);
    }
    @exposed
    test()
    {
        return seckey.getKey();
    }
    @exposed
    test2({secKey})
    {
        return seckey.validateKey(secKey);
    }


    //Create an Instace off the Skel
    addSkel() {
        return new TestSkel();
    }
    editSkel() {
        return new TestSkel();
    }

}