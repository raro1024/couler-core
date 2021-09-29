/**
 * Standart module where other can extends from
 */
const utils = require('../utils.js');
const db = require('../db.js');
class List
{
    constructor()
    {

    }
    /**
     * @param {object} module is an Instance for a skel to Provie bone Logic
     * @param {object} data All data that can write the Database 
     * @returns 
     */
    async add(module,data)
    {
        if(!utils.isPostRequest())
        {
            return "Add Request only over POST";
        }
        module.writeBones(data)
        module.toDB();

        
        return "ok"

    }
}
module.exports=List