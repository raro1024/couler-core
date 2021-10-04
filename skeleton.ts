import {
    stringBone
} from "./bones/stringbone";
import {
    dateBone
} from "./bones/datebone";

import {
    db
} from "./db";
import {
    Error
} from "./errors";
/**
 * Basic Skeleton class
 */

export class Skeleton {
    kindname: string;
    key: stringBone;
    createdate: dateBone;
    changedate: dateBone;
    constructor() {
        this.key = new stringBone(); //Set every time to find an Object
        this.createdate = new dateBone({
            defaultValue: Date.now()
        });
        this.changedate = new dateBone({
            defaultValue: Date.now()
        });
    }
    /**
     * 
     * @param {object} requestdata This value is an object that contains all data for the Bones
     * @param {boolean} fromClient If true the fale is not new set (Password)
     * 
     * Only if the bone exist the Data will be write in the Database
     * 
     */
    async writeBones(requestdata, fromClient = false) {
        console.log("Fill bones with Data from DB or reqest")
        for (const [bonename, bone] of Object.entries(this)) {
            if (typeof bone === "object") {
                if (fromClient) {
                    if (bone.unique) //We must check if a Skeleton Bone  with this value exist
                    {
                        var query = {};
                        query[bonename] = requestdata[bonename]
                        await new Promise((resolve, reject) => {
                            db.get(this.kindname, query).then(() => {
                                reject();
                            })
                        }).catch(() => {
                            throw {
                                "msg": "User exist"
                            }
                        });

                    }
                    bone.data = requestdata[bonename];
                } else {
                    bone.rawdata = requestdata[bonename];
                }

            }
        }
    }
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
    setBoneValue(boneName:string,value:any)
    {
        return this[boneName].data=value;
    }

    toDB() {
        db.toDB(this.kindname, this.readBones());
    }

    async fromDB(key) {

    }
}