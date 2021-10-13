import {Bone} from "./bone";
import * as objectPath from "object-Path";
export class stringBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false,count=1}={}) 
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique,});
        this.type = "string";
    }
    renderer(boneName)
    {
        let bone=super.renderer(boneName);
        return bone.outerHTML;
       
        
        
    }
    
}
