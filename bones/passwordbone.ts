import {Bone} from "./bone";
import {utils} from "../utils";
const crypto = require('crypto');


export class passswordBone extends Bone {

    constructor({multiple = false, defaultValue= undefined, required = true}={}) {
        super(multiple = multiple, defaultValue= defaultValue, required = required);
    }
    get data() {
        return this._value;
    }
    set data(_val) {
        
        if (_val == undefined) {
           throw "Password is empty"
        } else {
            var salt= utils.randomString();
            this._value = salt+"$"+crypto.createHash('sha256').update(salt+_val).digest('base64');

        }

    }
    check(_val) // Not so save :()
    {
        console.log("check pw");
        console.log(_val);
        console.log(this._value);

        var salt=this._value.split("$")[0];
        console.log(salt);
        console.log(this._value==crypto.createHash('sha256').update(salt+_val).digest('base64'));
        var salt=this._value.split("$")[0];
        return this._value==crypto.createHash('sha256').update(salt+_val).digest('base64')

    }


}
