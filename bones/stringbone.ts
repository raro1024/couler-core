import {
    Bone
} from "./bone";
import * as objectPath from "object-Path";
export class stringBone extends Bone {

    constructor({
        descr = undefined,
        multiple = false,
        defaultValue = undefined,
        required = false,
        unique = false,
        visible = true,
        readonly=false
    } = {}) {
        super({
            descr: descr,
            multiple: multiple,
            defaultValue: defaultValue,
            required: required,
            unique: unique,
            visible: visible,
            readonly:readonly,
        });
        this.type = "string";
    }
    renderer(boneName) {
        let bone = super.renderer(boneName);
        return bone;



    }

}