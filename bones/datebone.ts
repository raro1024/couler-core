
import {Bone} from "./bone";

export class dateBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false ,visible=true }={})
    { 
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique,visible:visible});
        this.type = "date";
    }
    renderer(boneName) {
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        <input  type="date" name="${boneName}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        `
    }

}
