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
              
        return `
        <div class="boneContainer"  data-multiple="${this.multiple?true:false}">
            <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
            <input  type="text" name="${boneName}${this.multiple?".0":""}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        </div>
        `
        
    }
    
}
