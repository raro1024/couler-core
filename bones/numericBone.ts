import {
    Bone
} from "./bone";

export class numericBone extends Bone {

    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false
    } = {}) {
        super({
            descr: descr,
            multiple: multiple,
            defaultValue: defaultValue,
            required: required,
            unique: unique
        });
        this.type = "numeric";
    }
    set data(_val) {
        if(_val)
        {
            super.data = parseFloat(_val);
        }
        else
        {
            super.data = _val;
        }
        
    }
    get data() {
        return super.data;
    }
    renderer(boneName) {
        let bone=super.renderer(boneName);
        bone.childNodes.forEach(node => {
            console.log(node)
            if(node.tagName=="input")
            {
                node["type"]="number";
            }
        });
        
        return bone.outerHTML;
       
    }
}