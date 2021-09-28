/**
 * Standart module where other can extends from
 */
 const utils = require('../utils.js');
class module_
{
    constructor()
    {

    }
    /**
     * 
     * @param {object} data All data that can write the Database 
     * @returns 
     */
    async add(module,data)
    {
        if(!utils.isPostRequest())
        {
            return "Add Request only over POST";
        }
        return("ok")

    }
}
module.exports=module_