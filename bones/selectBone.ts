import {Bone} from "./bone";
import { document } from 'html-element';

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
   
    renderer(boneName) {
        let outerBone=document.createElement("div");
        
        if(this.multiple && this._value)
        {
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
        let input=document.createElement("select");
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
        for(const[key,value] of Object.entries(this.options))
        {
            var opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = value;
            input.appendChild(opt);
        }
        container.appendChild(input);
        return container;

    }
    
}
