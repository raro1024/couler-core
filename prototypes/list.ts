/**
 * Standart module where other can extends from
 */
import {utils} from "../utils";
import {exposed} from "../decerators";
import {db} from "../db";

export class List {
    constructor() {

    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
    /**
     * @param {object} skel is an Instance for a skel to Provie bone Logic
     * @param {object} data All data that can write the Database 
     * @returns 
     */
    async add(skel, data) {
        if (!utils.isPostRequest()) {
            throw "Add Request only over POST";
        }

        await skel.writeBones(data,true);
        skel.toDB();
        return "ok"

    }
    /**
     * 
     * @param {string} key 
     *
     * @returns {Promise} Promies of user
     * Function must clear Password out of the object 
     */
    @exposed
    async view(key) {

        var userpromise;
        if (key === "self") {
            userpromise = utils.getCurrentUser().then(data => data);
        } else {
            userpromise = db.read(this.classname(), key);
        }

        return userpromise;

    }
    /**
     * 
     * 
     *
     * @returns {object} Object of user
     * Function must clear Password out of the object 
     */
     @exposed
     async list() {
        console.log("list ")
         return  db.list(this.classname());
     }
}