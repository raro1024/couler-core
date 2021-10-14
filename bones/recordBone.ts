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
import {
    document
} from 'html-element';
export class recordBone extends Bone {
    using: Skeleton;
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
        console.log("write to record");
        console.log(_val);
        console.log(this.using)
        if (_val == undefined) {
            throw "No Values In Record Bone"
        }
        if (typeof _val === "string") {
            _val = JSON.parse(_val)
        }

        if (_val && typeof _val === "object") {
            if (this.multiple) {
                this._value = [];
                for (let i = 0; i < _val.length; i++) {
                    for (const [bonename, bone] of Object.entries(this.using)) {
                        if (typeof bone === "object") {
                            bone.data = _val[i][bonename];
                        }


                    }
                    this._value.push(this.using.readBones());

                }
            } else {
                for (const [bonename, bone] of Object.entries(this.using)) {
                    if (typeof bone === "object") {
                        bone.data = _val[bonename];
                    }
                }

                this._value = this.using.readBones()
            }

        } else {
            throw "No Value  or No  object in record Bone"
        }
        console.log("end valie")
        console.log(this._value)

    }
    renderer(boneName) {
        let outerBone = document.createElement("div");

        if (this.multiple && this._value) {
            for (let i = 0; i < this._value.length; i++) {
                outerBone.appendChild(this.createBone(boneName, i));
            }
        } else {
            outerBone.appendChild(this.createBone(boneName));

        }
        return outerBone;
        //let usingSkel= new this.using();//Create instance of using skel


    }
    createBone(boneName, i = 0) {

        let container = document.createElement("div");
        container.setAttribute("data-multiple", `${this.multiple?true:false}`);
        container.setAttribute("data-name", boneName + (this.multiple ? ".0" : ""));
        container["class"] = "recordContainer";
        container["id"] = "boneName";
        container.setAttribute("data-multiple", `${this.multiple?true:false}`);

        for (const [bonename_, bone] of Object.entries(this.using)) {
            if (typeof bone === "object") {
                if (this._value) {
                    if(this.multiple)
                    {
                    if (this._value[i]) {
                        bone.data = this._value[i][bonename_]
                    }
                    }
                    else
                    {
                        bone.data = this._value[bonename_]
                    }
                }
                console.log(bone)
                let innerBoneName = boneName + (this.multiple ? ".0" : "") + "." + bonename_;
                console.log("innerbone")

                container.appendChild(bone.renderer(innerBoneName))
            }
        }
        return container

    }

}