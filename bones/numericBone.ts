import e = require("express");
import {
    Bone
} from "./bone";
/**
 * @param mode Can be Int or float (Default is int)
 * @param max Is the Maximum of the Value default there is no Maximum
 * @param min Is the Minimum of the Value default there is no Minimum
 */
export class numericBone extends Bone {
    mode: string;
    max: any;
    min: any;

    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false,
        visible = true,
        readonly = false,
        mode = "int",
        max = undefined,
        min = undefined,
    } = {}) {
        super({
            descr: descr,
            multiple: multiple,
            defaultValue: defaultValue,
            required: required,
            unique: unique,
            visible: visible,
            readonly: readonly,
        });
        this.type = "numeric";
        this.mode = mode;
        if(this.max)
        {
            if (parseFloat(max) === NaN) // Check if the Value can be Converted to a Number
            {
                throw "Max Value must be an Integer or an Float"
            }
        }
        if(this.min)
        {
            if (parseFloat(min) === NaN) // Check if the Value can be Converted to a Number
            {
                throw "Min Value must be an Integer or an Float"
            }
        }
        this.max = max;
        this.min = min;

    }
    set data(_val) {
        if (_val) {
            if (parseFloat(_val) === NaN) // Check if the Value can be Converted to a Number
            {
                throw "Value can not be Converted"
            }

            if (this.mode === "int") {
                _val = parseInt(_val);

            }
            if (this.mode === "fload") {
                _val = parseFloat(_val);
                
            }
            // After converting Check if the Value is to high or to low
            if(this.max)
            {
                if(_val>this.max)
                {
                    throw "Value is too high"
                }
            }
            if(this.min)
            {
                if(_val<this.min)
                {
                    throw "Value is too low"
                }
            }
            

        } else {
            if (this.required) {
                throw "There is no Value ??";
            }

        }
        this._value=_val;

    }
    get data() {
        return super.data;
    }
    renderer(boneName) {
        let bone = super.renderer(boneName);
        bone.childNodes[0].childNodes.forEach(node => {
            if (node.tagName == "input") {
                node["type"] = "number";
                if(this.max)
                {
                    node["max"]=this.max;
                }
                if(this.min)
                {
                    node["min"]=this.min;
                }
            }
        });

        return bone;

    }
}