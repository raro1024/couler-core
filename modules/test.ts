
import {Skeleton} from "../skeleton";
import { List } from "../prototypes/list";
import {db} from "../db";
import {utils} from "../utils";
import {exposed} from "../decerators";
import {Error} from "../errors";
import { stringBone } from "../bones/stringbone";
import { passswordBone } from "../bones/passwordbone";
import { recordBone } from "../bones/recordBone";

class TestRecordSkel extends Skeleton {
    testBone: stringBone;
    testBone1: stringBone;
    constructor()
    {
        super();
        this.testBone=new stringBone();
        this.testBone1=new stringBone();
    }
}

class TestSkel extends Skeleton {
    kindname="test"
    testRecord: recordBone;
   
    constructor() {
        super();
        this.testRecord = new recordBone({using:TestRecordSkel});
        
    }

}
export class Test extends List
{
    constructor() {
        super();
    }
    @exposed
    async add(data)
    {   
        console.log("add")
        console.log(data)
        return super.add(this.addSkel(),data);
    }
     //Create an Instace off the Skel
     addSkel()
     {
         return new TestSkel();
     }
}