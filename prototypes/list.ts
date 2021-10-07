/**
 * Standart module where other can extends from
 */
import {
    utils
} from "../utils";
import {
    exposed
} from "../decerators";
import {
    db
} from "../db";
import {
    json
} from "../routes/json";

export class List {
    kindname: any;
    defaultTemplate: string = "index.hbs"
    listTemplate: string = "list.hbs"
    viewTemplate: string = "view.hbs"
    addTemplate: string = "add.hbs"
    constructor() {

    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
    /**
     * @param {object} skel is an Instance for a skel to provide the bone Logic
     * @param {object} data All data that can write the Database 
     * 
     * IF /:module/add is an GET Request we Render the add Template
     * IF /:module/add is an POST Request we write the data form the client to the Database
     * 
     * @returns 
     */
    async add(skel, data) {
        console.log("in ADD")
        if (!utils.isPostRequest()) { 
            //Delete all Bones and Attributes that are not needed
            delete skel.kindname;
            for (const [bonename, bone] of Object.entries(skel)) {
                if (typeof bone === "object") {
                    if (!skel[bonename].visible) {
                        delete skel[bonename]
                    }
                }
            }

            return this.render(this.addTemplate, skel)
        }
        //Prepare data before we wirting it to the bones
        
        var modifiedData=this.prepareData(data);
        await skel.writeBones(modifiedData, true);
        skel.toDB();
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
        console.log("view key is " + key)
        var userpromise;
        if (key === "self") {
            userpromise = utils.getCurrentUser().then(data => data);
        } else {
            return this.render(this.viewTemplate, await db.get(this.classname(), key));
        }
    }
    /**
     *
     * @returns {object} Object of user
     * Function must clear Password out of the object 
     */
    @exposed
    async list() {
        return this.render(this.listTemplate, await db.get(this.classname()));
    }

    /**
     * 
     * @param data 
     * @param template If html the Site to render
     */
    render(template = this.listTemplate, skel) {

        let renderer = utils.getCurrentRender();
        switch (utils.getCurrentRenderName()) {
            case "json":
                return renderer.render(skel)
            case "html":
                return [template, skel]
            default:
                return json.render(skel)
        }
    }
    prepareData(data)
    {
        console.log("###Prepare######")
        console.log(data)        

        var modifiedData={}
        for (const [boneName, boneData] of Object.entries(data)) 
        {

            if(boneName.indexOf(".")==-1)
            {
                console.log("Noraml value")
                
                console.log(boneName,boneData)
                modifiedData[boneName]=boneData
            }
            else
            {
                console.log("DETECT Record bone *********")
                const tmpPath=boneName.split(".");
                var refObjOld;
                for(let i=0; i<tmpPath.length;i++)
                {
                    var refObj=i>0?refObjOld:modifiedData;
                    if(refObj[tmpPath[i]])
                    {
                        refObj=refObj[tmpPath[i]];
                        if(i+2==tmpPath.length)
                        {
                            refObj[tmpPath[i+1]]=boneData;
                        }
                        
                    }
                    else
                    {
                        refObj[tmpPath[i]]={};
                        refObj=refObj[tmpPath[i]];
                        if(i+2==tmpPath.length)
                        {
                            refObj[tmpPath[i+1]]=boneData;
                        }
                    }
                    refObjOld=refObj;
                }
               
               
            }
            
        }
        return modifiedData;
    }
}