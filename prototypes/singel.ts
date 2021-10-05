import {
    db
} from "../db";
import {
    exposed
} from "../decerators";
import {
    json
} from "../routes/json";
import {
    utils
} from "../utils";

export class Singel {
    indexTemplate = "index.ejs";
    viewTemplate = "view.ejs"
    constructor() {

    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
    @exposed
    async view(key = undefined) {
        
        if (key !== undefined && !utils.isEmpty(key)) {
            return this.render(await db.get(this.classname(), key));
        }
        return this.render();

    }
    render(data = {}, template = this.indexTemplate) {
        let renderer = utils.getCurrentRender();
        switch (utils.getCurrentRenderName()) {
            case "json":
                return renderer.render(data)
            case "html":
                return renderer.render(template, data)
            default:
                return json.render(data)
        }
    }
}