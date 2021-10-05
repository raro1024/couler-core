
import {Skeleton} from "../skeleton";
import { List } from "../prototypes/list";
import {db} from "../db";
import {utils} from "../utils";
import {exposed} from "../decerators";
import {Error} from "../errors";
import { stringBone } from "../bones/stringbone";
import { passswordBone } from "../bones/passwordbone";
import { recordBone } from "../bones/recordBone";
import { Tree } from "../prototypes/tree";

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
    dirtest: stringBone;
   
    constructor() {
        super();
        //this.testRecord = new recordBone({using:TestRecordSkel});
        this.dirtest = new stringBone();
        
    }

}
export class Test extends Tree
{
    constructor() {
        super();
    }
    @exposed
    async add(data)
    {   
        return super.add(this.addSkel(),data);
    }
     //Create an Instace off the Skel
     addSkel()
     {
         return new TestSkel();
     }
}