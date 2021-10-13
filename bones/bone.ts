import { document } from 'html-element';

import {
    utils
} from "../utils";

/**
 * Basic Bone
 * @param descr For the Frontend stand in the placeholder of the Input
 * @param multiple 
 * False : Data will be stored as a Single value 
 * True : Data  will be stored as an Array of values
 *
 */
export class Bone {
    type: string;
    descr: any;
    _value: any;
    multiple: boolean;
    defaultValue: any;
    required: boolean;
    unique: boolean;
    visible: boolean;
    readonly: boolean;
    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = null,
        required = false,
        unique = false,
        visible = true,
        readonly = false,
    }) {
        this.type = "bone";
        this.descr = descr || "";
        this._value = null;
        this.multiple = multiple;
        this.defaultValue = defaultValue;
        this.required = required;
        this.unique = unique;
        this.visible = visible;
        this.readonly = readonly;
        //Check if the params not exclude eachother
        if (!this.visible && this.required) throw `Error in ${this.classname()} not visible but required`;
        //this.default=default;

    }

    classname(_class = this) {
        console.log(_class.constructor.name)
    }

    get data() {
        if(!this._value)
        {
            if(this.defaultValue)
            {
                return this.defaultValue;
            }
        }
        return this._value;
    }
    //Here is how it works :] https://imgur.com/a/QgaQ8xg ?? 
    set data(_val) {
        if (_val == undefined) {
            if (this._value) {
                return
            }
            if (this.defaultValue) {
                this.data = this.defaultValue
            }

        } else {
            if (this.multiple) {
                if (utils.isArray(_val)) {
                    if (_val.length > 0) {
                        this._value = this.convertData(_val);
                    }

                } else {
                    this._value = [this.convertData(_val)];
                }
            } else {
                if (utils.isArray(_val)) {
                    this.data = this.convertData(_val[0])
                } else {
                    this._value = this.convertData(_val);
                }
            }


        }

    }
    /**
     * When the Value comes form the Database the password shoud not new set
     */
    set rawdata(_val) {

        this._value = _val;
    }
    convertData(_val) {
        return _val;
    }
    renderer(boneName) {
        let outerBone=document.createElement("div");
        if(this.multiple && this._value)
        {
            var boneArr=[];
            for(let i =0;i<this._value.length;i++)
            {
                outerBone.appendChild(this.createBone(boneName,i));
            }
        }
        else
        {
            outerBone.appendChild(this.createBone(boneName));
           
        }
        return outerBone;
       
    }
    createBone(boneName,i=0)
    {
        
        let container=document.createElement("div");
        container["class"]="boneContainer";
        container.setAttribute("data-multiple",`${this.multiple?true:false}`);
        //Create Label
        let inputLabel=document.createElement("label");
        inputLabel["for"]="id";
        inputLabel["id"]=boneName+"-label";
        inputLabel.textContent=this.descr?this.descr:boneName;
        container.appendChild(inputLabel);
        //Create input
        let input=document.createElement("input");
        input["id"]=boneName;
        input["name"]=boneName+(this.multiple?"."+i:"");

        input["placeholder"]=this.descr;
        if(this.required)
        {
            input["required"]=true;
        }

        if(this._value)
        {
            input["value"]=this.data[i];
        }
        container.appendChild(input);
        return container;

    }

}