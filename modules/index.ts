import { conf } from "../conf";
import {db} from "../db";
import {
    exposed
} from "../decerators";
import { Single } from "../prototypes/Single";

import {
    html
} from "../routes/html";
import { json } from "../routes/json";
import * as utils from "../utils";


/**
 * If "/*" Called
 */
export class Index extends Single{
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