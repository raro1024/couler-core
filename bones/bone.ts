/**
 * Basic Bone
 */
export class Bone {
    type: string;
    descr: any;
    _value: any;
    multiple: boolean;
    defaultValue: any;
    required: boolean;
    unique: boolean;
    /**
     * 
     * @param {boolean} multiple
     * @param
     * 
     * 
     */
    constructor({descr=undefined, multiple = false, defaultValue = null, required = false, unique = false}) {
        this.type = "bone";
        this.descr = descr||"";
        this._value = null;
        this.multiple = multiple;
        this.defaultValue = defaultValue;
        this.required = required;
        this.unique = unique;
        //this.default=default;

    }

    classname(_class = this) {
        console.log(_class.constructor.name)
    }

    get data() {
        return this._value;
    }

    set data(_val) {

        if (_val == undefined) {
            this._value = this.defaultValue;
        } else {

            this._value = _val;
        }

    }
    /**
     * When the Value comes form the Database the password shoud not new set
     */
    set rawdata(_val) {

        this._value = _val;
    }

}