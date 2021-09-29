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
    /**
     * Problem : If I read the Value form the Database the Function thinks it's comes form Client
     */
    set data(_val) {
        
        if (_val == undefined) {
           throw "Password is empty"
        } else {
            var salt= utils.randomString();
            this._value = salt+"$"+crypto.createHash('sha256').update(salt+_val).digest('base64');

        }

    }
    /**
     * When the Value comes form the Database the password shoud not new set
     */
    set rawdata(_val) {
        
        this._value=_val;
    }
    check(_val) // Not so save :()
    {
        var [salt,password]=this._value.split("$");
        return password==crypto.createHash('sha256').update(salt+_val).digest('base64')

    }


}
