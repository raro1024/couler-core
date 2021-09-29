import {Bone} from "./bone";

export class stringBone extends Bone {

    constructor({multiple = false, defaultValue= undefined, required = false,unique=false }={}) {
        super(multiple = multiple, defaultValue= defaultValue, required = required,unique=unique);
    }

}
