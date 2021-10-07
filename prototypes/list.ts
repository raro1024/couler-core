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
import * as objectPath from "object-Path";
export class List {
    kindname: any;
    defaultTemplate: string = "index.hbs"
    listTemplate: string = "list.hbs"
    viewTemplate: string = "view.hbs"

    addTemplate: string = "add.hbs"
    addSuccessTemplate: string = "addSuccess.hbs"
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
     * Works on Skel Layer
     * @returns 
     */
    async add(skel, data) {
        console.log("in ADD")
        if (!utils.isPostRequest()) {
            //Delete all Bones and Attributes that are not needed
            delete skel.kindname;
            for (const [bonename, bone] of Object.entries(skel)) {
                if (bone) {
                    if (typeof bone === "object") {
                        if (!skel[bonename].visible) {
                            delete skel[bonename]
                        }
                    }
                } else {
                    delete skel[bonename]
                }
            }

            skel = this.unfoldSkel(skel)
            return this.render(this.addTemplate, skel)
        }
        //Prepare data before we wirting it to the bones

        var modifiedData = this.prepareData(data);
        await skel.writeBones(modifiedData, true);
        var key = await skel.toDB();

        if (key) {
            return this.render(this.addSuccessTemplate, skel.readBones())
        }

    }
    /**
     * 
     * @param {string} key 
     *
     * @returns {Promise} Promies of user
     * Function must clear Password out of the object 
     */
    @exposed
    async view(param) {
        var skel = await db.get(this.classname(), param["key"])
        return this.render(this.viewTemplate, skel);
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

    /**
     * 
     * @param data 
     * @returns modifiedData
     * Options for the Names:
     * {"boneName":boneData} will be  {"boneName":boneData}
     * //Mulitple
     * {"boneName:0":boneData} will be  {"boneName":[boneData]}
     * if
     * {"boneName.1":boneData1} will be  {"boneName":[boneData,boneData1]}
     * 
     * //Record
     * {"recordBoneName.otherBoneName":boneData} will be  {"recordBoneName":{"otherBoneName":boneData}}
     * 
     */
    prepareData(data) {


        var modifiedData = {}
        for (const [boneName, boneData] of Object.entries(data)) {

            if (boneName.indexOf(":") == -1) {
                objectPath.set(modifiedData, boneName, boneData)
            } else {
                objectPath.push(modifiedData, boneName.split(":")[0], boneData)
            }
        }

        return modifiedData;

    }
    unfoldSkel(skel) {
        var modifiedData = {}
        for (const [boneName, boneArgs] of Object.entries(skel)) {

            if (boneArgs) {
                if (boneArgs.type == "record") {
                    boneArgs.using = this.unfoldSkel(new boneArgs.using());
                    modifiedData[boneName] = boneArgs;
                } else {
                    modifiedData[boneName] = boneArgs
                }
            }

        }

        return modifiedData;
    }
}