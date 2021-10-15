/**
 * This Bone stores the Metadata for the files in an Object
 * -filename
 * -encoding
 * -mimetype
 * -downloadURL
 * -size
 */
 import { document } from 'html-element';
import {Bone} from "./bone";

export class fileBone extends Bone {

    constructor({descr=undefined, multiple = false, defaultValue= undefined, required = false,unique=false }={})
    {
        super({descr: descr, multiple : multiple, defaultValue: defaultValue, required : required,unique:unique});
        this.type = "file";
    }
    
    convertData(_val)
    {
        if (typeof _val === "string")
        {
            return JSON.parse(_val)
        }
       
        if (_val && typeof _val === "object") {
           return _val
        } 
    }
    renderer(boneName) {
        let bone=super.renderer(boneName);
        bone.childNodes[0].childNodes.forEach(node => {
            if(node.tagName=="input")
            {
                console.log("found node");
                console.log(node);
                node["type"]="file";
                
            }
        });

        let hiddeninput=document.createElement("input");
        hiddeninput["id"]=boneName+"-filedata";
        hiddeninput["name"]=boneName+(this.multiple?".0":"");
        hiddeninput["hidden"]=true;
        bone.childNodes[0].appendChild(hiddeninput)
        return bone;
    }

}
