import { conf } from "../conf";
import {
    db
} from "../db";
import {
    exposed
} from "../decerators";
import { Singel } from "../prototypes/singel";
import {
    html
} from "../routes/html";
import { json } from "../routes/json";
import {
    utils
} from "../utils";


/**
 * If "/*" Called
 */
export class Index extends Singel{
    kindname = "index"
    
    constructor() {
        super();
    }
    @exposed
    async view(key=undefined)
    {
        return super.view(key)
    }

}