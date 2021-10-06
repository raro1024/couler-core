import {Bone} from "./bone";

export class numericBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false }={}) 
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "numeric";
    }
    set data(_val)
    {
        super.data=parseFloat(_val);
    }
    get data()
    {
        return super.data;
    }
}
