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

    constructor({multiple = false, defaultValue= undefined, required = false,unique=false }={}) {
        super(multiple = multiple, defaultValue= defaultValue, required = required,unique=unique);
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

}
