import e = require("express");
import {Bone} from "./bone";

export class booleanBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= false, required = false,unique=false }={}) 
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "boolean";
        
    }
    set data(_val)
    {
        if(_val == "on")
        {
            super.data=true;
        }
        else
        {
            super.data=false;
        }
    }
    get data()
    {
        return super.data;
    }
    renderer(boneName)
    {
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        <input  type="checkbox" name="${boneName}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        `
    }
    
}
