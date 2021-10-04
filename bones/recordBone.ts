/**
 * List Bone for Bones
 * 
 */
import { any } from "webidl-conversions";
import {
    Skeleton
} from "../skeleton";
import {
    Bone
} from "./bone";

export class recordBone extends Bone {
    using: typeof Skeleton;
    declare _value:  Skeleton;
    constructor({
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false,
        using = Skeleton
    } = {}) {
        super(multiple = multiple, defaultValue = defaultValue, required = required, unique = unique);
        this.using = using;

    }
    get data() {
        var bonevals={}

        for (const [bonename, bone] of Object.entries(this._value)) 
        {
            if (typeof bone === "object") {

                bonevals[bonename]=bone.data;
            }
        }
        return bonevals
    }

    set data(_val) {
        if(_val==undefined)
        {
            throw "No Values In Record Bone"
        }
        if (typeof _val === "string")
        {
            _val=JSON.parse(_val)
        }
       
        if (_val && typeof _val === "object") {
            var skel=new this.using()
            for (const [bonename, bone] of Object.entries(skel)) {
                if (typeof bone === "object") {
                    console.log(_val[bonename])
                    bone.data = _val[bonename];
                }
            }
            this._value=skel
        }
        else
        {
            throw "No Value  or No  object in record Bone"
        }

    }

}