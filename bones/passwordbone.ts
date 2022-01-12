import {Bone} from "./bone";
import * as utils from "../utils";
const crypto = require('crypto');


export class passswordBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false }={})
    { 
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "password"
        this.required=true;
    }
    get data() {
        return this._value;
    }
    /**
     * Problem : If I read the Value form the Database the Function thinks it's comes form Client
     */
    set data(_val) {
        
        if (_val == undefined || _val==='') {
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
    check(_val) // Not so save :(
    {
        console.log(_val)
        var [salt,password]=this._value.split("$");
        return password==crypto.createHash('sha256').update(salt+_val).digest('base64')

    }
    renderer(boneName)
    {
    
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        <input  type="password" name="${boneName}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        `

    }   


}
