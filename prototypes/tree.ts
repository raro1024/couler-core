/**
 * Standart module to represent a Directory structure 
 */
 import {utils} from "../utils";
 import {exposed} from "../decerators";
 import {db} from "../db";
 import {json} from "../routes/json";
import { stringBone } from "../bones/stringbone";
 
 export class Tree {
     kindname:any;
     listTemplate:string="list.ejs"
     parent: any; //if null root level
     type: any; //dir or file
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
         skel["parent_id"]=new stringBone();
         skel["parent_id"].data=data["parent_id"];
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
      async list(parent_id) {
          console.log("parent id")
          console.log(parent_id)
          if(utils.isEmpty(parent_id))
          {
              parent_id=null;
          }
         return  this.render(await db.get(this.classname(),{"parent_id":parent_id}));
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