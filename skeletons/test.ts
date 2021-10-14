import {
    numericBone
} from "../bones/numericBone";
import {
    recordBone
} from "../bones/recordBone";
import {
    stringBone
} from "../bones/stringBone";
import {
    RefSkeleton,
    Skeleton
} from "../skeleton";

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
        this.recordinRecordtest=new recordBone({
            using:RefRefTest,
            parent:this
        })

    }
}


export class TestSkel extends Skeleton {
    kindname = "test"
    edittest: stringBone;
    recordTest: recordBone;
    constructor() {
        super();
        this.edittest = new stringBone({
            multiple: true
        });
        this.recordTest = new recordBone({
            using : RefTest,
            parent : this,
            multiple:false
        })
    }
}