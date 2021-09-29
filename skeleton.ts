/**
 * Basic Skeleton class
 */
 const db = require('./db.js');
class Skeleton
{
    kindname=""
    constructor()
    {

    }
    /**
     * 
     * @param {object} data This value is an object that contains all data for the Bones
     * 
     * Only if the bone exist the Data will be write in the Database
     * 
     */
    writeBones(requestdata)
    {

        for (const [bonename, bone] of Object.entries(this)) {
            if(typeof bone==="object")
            {  
                bone.data=requestdata[bonename];
            }
        }
    }
    readBones()
    {
        var  bonevals={}
        for (const [bonename, bone] of Object.entries(this)) {
            if(typeof bone==="object")
            {  
                bonevals[bonename]=this[bonename].data;
            }
        }

        return bonevals
    }
    toDB()
    {
        db.toDB(this.kindname,this.readBones());
    }
}
module.exports=Skeleton;