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
    get data() {
        return this._value;
    }

    set data(_val) {
        console.log(_val)
        if(_val==undefined)
        {
            throw "No Values In File Bone"
        }
        if (typeof _val === "string")
        {
            _val=JSON.parse(_val)
        }
       
        if (_val && typeof _val === "object") {
            this._value=_val
        }
        else
        {
            throw "No Value  or No  object in File Bone"
        }

    }
    renderer(boneName) {
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        <input  type="file" name="${boneName}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        `
    }

}
