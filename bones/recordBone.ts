/**
 * Record Bone 
 * Store the data in a dictionary
 * @param using Is a the name of the Refskel (I cant use the class because I must check if the Bone have a using the ref to the skel)
 * example
 * Sekeleton A:
 *  recordBone(using="A") 
 * 
 */
import {
    Skeleton
} from "../skeleton";
import {
    Bone
} from "./bone";

export class recordBone extends Bone {
    using: typeof Skeleton;
    parent: typeof Skeleton;
    declare _value: any;
    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false,
        using = undefined,
        parent = undefined
    } = {}) {
        super({
            descr: descr,
            multiple: multiple,
            defaultValue: defaultValue,
            required: required,
            unique: unique
        });
        this.using = using;
        this.type = "record";
        if (!using) {
            throw "No Using set in Recordbone"
        }
        if (!parent) {
            throw "No Parnet set in Recordbone"
        }

        if (parent.classname() === using.name.toLowerCase()) {
            throw "Recordbone using is same Class as Parent "
        }




    }
    get data() {
      return this._value;

    }

    set data(_val) {
        if (_val == undefined) {
            throw "No Values In Record Bone"
        }
        if (typeof _val === "string") {
            _val = JSON.parse(_val)
        }

        if (_val && typeof _val === "object") {
            if (this.multiple) {
                this._value=[];
                for (let i = 0; i < _val.length; i++) {
                    var skel = new this.using()
                    for (const [bonename, bone] of Object.entries(skel)) {
                        if (typeof bone === "object") {
                            bone.data = _val[i][bonename];
                        }
                       
                        
                    }
                    console.log("set val")
                    console.log(skel.readBones())
                    this._value.push(skel.readBones());
                    
                }
            } else {
                var skel = new this.using()
                for (const [bonename, bone] of Object.entries(skel)) {
                    if (typeof bone === "object") {
                        bone.data = _val[bonename];
                    }
                }
                
                this._value = skel.readBones()
            }

        } else {
            throw "No Value  or No  object in record Bone"
        }
        console.log("end valie")
        console.log(this._value)

    }
    renderer(boneName) {

        //let usingSkel= new this.using();//Create instance of using skel
        var innerBone = ``
        for (const [bonename_, bone] of Object.entries(this.using)) {
            if (typeof bone === "object") {

                //console.log(boneName+"."+bonename_);
                //console.log(boneName+(this.multiple?":0":"")+"."+bonename_);
                let innerBoneName = boneName + (this.multiple ? ".0" : "") + "." + bonename_
                innerBone += bone.renderer(innerBoneName);
            }
        }
        return `
        
        <div id="${boneName}" data-multiple="${this.multiple?true:false}" data-name="${boneName + (this.multiple ? ".0" : "")}" class="recordContainer">
            ${innerBone}
        </div>
        `
    }

}