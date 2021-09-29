/**
 * Basic Bone
 */
export class Bone {
    _value: any;
    multiple: boolean;
    defaultValue: any;
    required: boolean;
    /**
     * 
     * @param {boolean} multiple
     * @param
     * 
     * 
     */
    constructor(multiple = false, defaultValue: null, required = false) {
        this._value = null;
        this.multiple = multiple;
        this.defaultValue = defaultValue;
        this.required = required;
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
            this._value=_val;

        }

    }

}