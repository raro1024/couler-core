/**
 * Standart module where other can extends from
 */
import {utils} from "../utils";
import {exposed} from "../decerators";
import {db} from "../db";
import {json} from "../routes/json";

export class List {
    kindname:any;
    defaultTemplate:string="index.hbs"
    listTemplate:string="list.hbs"
    viewTemplate:string="view.hbs"
    addTemplate:string="add.hbs"
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
           return this.render(skel,this.addTemplate)
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
        console.log("view key is "+key)
        var userpromise;
        if (key === "self") {
            userpromise = utils.getCurrentUser().then(data => data);
        } else {
            return  this.render(this.viewTemplate,await db.get(this.classname(),key));
        }
    }
    /**
     *
     * @returns {object} Object of user
     * Function must clear Password out of the object 
     */
     @exposed
     async list() {
        return  this.render(this.listTemplate,await db.get(this.classname()));
     }
     
     /**
      * 
      * @param data 
      * @param template If html the Site to render
      */
     render(template=this.listTemplate,skel)
     {
       
        let renderer =utils.getCurrentRender();
        switch (utils.getCurrentRenderName())
        {
            case "json":
                return renderer.render(skel)
            case "html":
                return [template,skel]
            default :
                return json.render(skel)
        }
     }
}