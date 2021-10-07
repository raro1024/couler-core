import {Bone} from "./bone";

export class selectBone extends Bone {
    options: any;

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false,options=undefined}={}) 
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "select";
        this.options = options;
        if(!options)
        {
            throw "No Options in Selectbone"
        }
    }
    renderer(boneName)
    {
        console.log("render select")
        return `
        <div class="boneContainer"  data-multiple="${this.multiple?true:false}">
            <label  for="${boneName}">${this.descr?this.descr:boneName}</label >
            <select name="${boneName}${this.multiple?":0":""}" id="${boneName}" placeholder="${this.descr}" ${this.required?"required":""} ${this.readonly?"required":""}>
                ${
                    Object.keys(this.options).map((key)=>{
                        if(this.defaultValue===key)
                        {
                            return `<option selected value="${key}">${this.options[key]}</option>`
                        }
                        else
                        {
                            return `<option value="${key}">${this.options[key]}</option>`
                        }
                })}
            </select>
        </div>
        `
        
    }
    
}
