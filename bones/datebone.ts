
import {Bone} from "./bone";

export class dateBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false ,visible=true }={})
    { 
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique,visible:visible});
        this.type = "date";
    }
    renderer(boneName, bone) {
        if (bone.visible) {
            return `
        <label  for="${boneName}">${boneName}</label >
        <input type="date" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
        `
        }
    }
    

}
