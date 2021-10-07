import {Bone} from "./bone";

export class stringBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false }={}) 
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "string";
    }
    renderer(boneName,bone)
    {
        return`
        <label  for="${boneName}">${boneName}</label >
        <input type="text" name="${boneName}" id="${boneName}" placeholder="${bone.descr}" ${bone.required?"required":""}></input>
        `
    }
    
}
