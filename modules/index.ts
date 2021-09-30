import {
    db
} from "../db";
import {
    exposed
} from "../decerators";
import { List } from "../prototypes/list";
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
export class Index extends List{
    kindname = "index"
    
    constructor() {
        super();
    }
    @exposed
    async list() {
        var data = await db.list(this.kindname).then(d=>d);
        return this.
        

    }

}