/**
 * Basic Bone
 */
class Bone {
    /**
     * 
     * @param {boolean} multiple
     * @param
     * 
     * 
     */
    constructor({
        multiple = false,
        defaultValue
    } = {}) {
        this._value;
        this.multiple = multiple;
        this.defaultValue = defaultValue;
        //this.default=default;

    }

    classname(_class = this) {
        console.log(_class.constructor.name)
    }

    get data() {
        return this._value;
    }
    set data(_val,append=false) {
        if (_val == undefined) {
            this._value = this.defaultValue;
        } else {
            if (Array.isArray(_val)) {
                if (this.multiple) {
                    this._value = _val;
                } else {
                    throw "Error not multiple"
                }

            } else {
                if (this.multiple) {
                    if(append)
                    {
                        
                    }
                    else
                    {
                        this._value = [_val];
                    }
                    
                } else {
                    this._value = this._val;
                }
            }


        }

    }

}
module.exports = Bone;