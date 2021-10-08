/**
 * HTML Input TTypes
 * ~date
 * ~date-time
 * ~time
 * @param {Boolean} date if true render input with type date (default true)
 * @param {Boolean} time if true render input with type time (default false)
 */
import {
    Bone
} from "./bone";

export class dateBone extends Bone {
    date: boolean;
    time: boolean;

    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false,
        visible = true,
        date = true,
        time = false
    } = {}) {
        super({
            descr: descr,
            multiple: multiple,
            defaultValue: defaultValue,
            required: required,
            unique: unique,
            visible: visible
        });
        this.type = "date";
        this.date = date
        this.time = time
    }
   
    convertData(_val)
    {
        return new Date(_val);   
    }
    renderer(boneName) {
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        
        <input  type="${this.getType()}" name="${boneName}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}></input>
        `
    }
    getType() {
        if (this.time) {
            if (this.date) {
                return "datetime-local";
            } else {
                return "time";
            }
        }
        //Fallback if nothing is returned ??
        return "date"
    }


}