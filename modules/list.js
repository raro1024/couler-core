/**
 * Standart module where other can extends from
 */
 const utils = require('../utils.js');
class List
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
        console.log(module)
        console.log(data)
        return("ok")

    }
}
module.exports=List