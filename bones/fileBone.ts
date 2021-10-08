/**
 * This Bone stores the Metadata for the files in an Object
 * -filename
 * -encoding
 * -mimetype
 * -downloadURL
 * -size
 */
import {Bone} from "./bone";

export class fileBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false }={})
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "file";
    }
    
    convertData(_val)
    {
        if (typeof _val === "string")
        {
            return JSON.parse(_val)
        }
       
        if (_val && typeof _val === "object") {
           return _val
        } 
    }
    renderer(boneName) {
        return `
        <div class="boneContainer"  data-multiple="${this.multiple?true:false}">
            <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
            <input  type="file"  id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
            <input  type="text"  name="${boneName}${this.multiple?".0":""}" id="${boneName}-filedata" hidden></input>
        </di
        `
    }

}
