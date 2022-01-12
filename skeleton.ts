import {
    stringBone
} from "./bones/stringBone";
import {
    dateBone
} from "./bones/dateBone";

import {
    db
} from "./db";


/**
 * Basic Skeleton class
 */

export class Skeleton {
    type: string = "add";
    kindname: string;
    key: stringBone;
    createdate: dateBone;
    changedate: dateBone;
    constructor(isRef:boolean = false) {
        if (!isRef) {

            this.key = new stringBone({
                visible: false,
                readonly: true
            })
            this.createdate = new dateBone({
                defaultValue: Date.now(),
                visible: false,
                readonly: true
            });
            this.changedate = new dateBone({
                defaultValue: Date.now(),
                visible: false,
                readonly: true
            });

        }

    }
    /**
     * 
     * @param {object} requestdata This value is an object that contains all data for the Bones
     * @param {boolean} fromClient If true the fale is not new set (Password)
     * 
     * Only if the bone exist the Data will be write in the Database
     * 
     */
    writeBones(requestdata, fromClient = false) {

        console.log("Fill bones with Data from DB or reqest")
        if (this.type === "view") {
            for (const [bonename, bone] of Object.entries(this)) {
                if (typeof bone === "object") {
                    this[bonename] = requestdata[bonename];
                }
            }
        } else {
            for (const [bonename, bone] of Object.entries(this)) {
                if (typeof bone === "object") {

                    if (fromClient) {
                        if (!bone.readonly) { // Wen not accept Date that is readonly
                            bone.data = requestdata[bonename];
                        }
                    } else {
                        bone.rawdata = requestdata[bonename];
                    }


                }
            }
        }

    }
    /**
     * 
     * @returns Object of Bonedata {bonename:bonedata}
     */
    readBones() {
        var bonevals = {}
        for (const [bonename, bone] of Object.entries(this)) {
            if (typeof bone === "object") {
                bonevals[bonename] = this[bonename].data;
            }
        }

        return bonevals
    }
    /**
     * 
     * @param boneName Name of the Bone 
     * @param value 
     */
    setBoneValue(boneName: string, value: any) {
        return this[boneName].data = value;
    }

    async toDB() {

        if (this.key.data) {
            // Edit
            console.log("Edit now __");
            console.log(this.key.data);

            this.changedate.data = new Date(); // Overwirte Change date

            return await db.update(this.kindname, this.readBones(), this.key.data);

        } else {
            //Add
            //Check for unique Value
            for (const [bonename, bone] of Object.entries(this)) {
                if (typeof bone === "object") {
                    if (bone.unique) //We must check if a Skeleton Bone  with this value exist
                    {
                        let query = {};
                        query[bonename] = bone.data
                        if (await db.get(this.kindname, query, 1)) {

                            throw "Uniqe Value Exist in Databse"
                        }

                    }

                }
            }
            var key = await db.put(this.kindname, this.readBones());

            if (key) {
                db.update(this.kindname, {
                    "key": key.toString()
                }, key.toString());
                this.key.data = key;
                return true;
            }
            return false;
        }

    }
    /**
     * 
     * @param key of the skel in the Database
     * Reads the SkelData from the Database and fill alll bones with data
     * @returns {Boolen} If skel was found
     */
    async fromDB(key) {
        console.log("In form db")
        const skelData = await db.get(this.kindname, key);
        if (skelData != null) {
            this.writeBones(skelData);
            return true
        }
        return false;

    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
}
export type SkeletonType = Skeleton;
export class RefSkeleton extends Skeleton {

    constructor() {
        console.log("is ref")
        super(true);
    }

}
