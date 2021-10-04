/**
 * Standart module where other can extends from
 */
import {utils} from "../utils";
import {exposed} from "../decerators";
import {db, list} from "../db";
import {json} from "../routes/json";

export class List {
    kindname:any;
    listTemplate:string="list.ejs"
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
        utils.getCurrentRender();
        var userpromise;
        if (key === "self") {
            userpromise = utils.getCurrentUser().then(data => data);
        } else {
            userpromise = db.get(this.classname(), key);
        }

        return userpromise;

    }
    /**
     *
     * @returns {object} Object of user
     * Function must clear Password out of the object 
     */
     @exposed
     async list() {
        return  this.render(await db.list(this.classname()));
     }
     /**
      * 
      * @param data 
      * @param template If html the Site to render
      */
     render(data,template=this.listTemplate)
     {
       
        let renderer =utils.getCurrentRender();
        switch (utils.getCurrentRenderName())
        {
            case "json":
                return renderer.render(data)
            case "html":
                return renderer.render(template,data)
            default :
                return json.render(data)
        }
     }
}