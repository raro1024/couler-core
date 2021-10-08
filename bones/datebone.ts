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
        if(!this.date && this.time)
        {
            return _val; // ??
        }
        return new Date(_val);   
    }
    prepareData(_val)
    {
        _val=this.convertData(_val);

        switch(this.getType()){
            case "date":
                return _val.toISOString().split('T')[0];
            case "time":
                return _val
            case "datetime-local":
                return  _val.toISOString().split(".")[0];
            
                
        }
        

    }
    renderer(boneName) {
        return `
        <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
        <input  type="${this.getType()}" 
        name="${boneName}" 
        id="${boneName}" 
        placeholder="${this.descr}" 
        ${this.required?"required":""} 
        ${this._value?`value='${this.prepareData( this._value)}''`:``} ></input>
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