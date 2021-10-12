import {
    stringBone
} from "./bones/stringBone";
import {
    dateBone
} from "./bones/dateBone";

import {
    db
} from "./db";
import {
    Error
} from "./errors";
import e = require("express");
import { Bone } from "./bones/bone";
/**
 * Basic Skeleton class
 */

export class Skeleton {
    kindname: string;
    key: stringBone;
    createdate: dateBone;
    changedate: dateBone;
    constructor(isRef = false) {
        if (!isRef) {
            this.key = new stringBone()
            this.createdate = new dateBone({
                defaultValue: Date.now(),
                visible: false
            });
            this.changedate = new dateBone({
                defaultValue: Date.now(),
                visible: false
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
        //Check for unique Value
        for (const [bonename, bone] of Object.entries(this)) {
            if (typeof bone === "object") {

                if (bone.unique) //We must check if a Skeleton Bone  with this value exist
                {
                    if(await db.get(this.kindname,{String(bonename):bone.data},1))
                    {

                        throw "Uniqe Value Exist in Databse"
                    }

                }

            }
        }
        if (this.key.data) // edit
        {
            this.changedate.data = new Date(); // Overwirte Change date

            return await db.update(this.kindname, this.readBones(), this.key.data);

        } else // add
        {

            var key = await db.put(this.kindname, this.readBones());
            if (key)

            {
                this.key.data = key;
                return true;
            }
            return false;
        }

    }

    async fromDB(key) {
        this.writeBones(await db.get(this.kindname, key));
    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
}
export class RefSkeleton extends Skeleton {
    constructor() {
        console.log("is ref")
        super(true);
    }

}