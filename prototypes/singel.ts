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
    indexTemplate = "index.hbs";
    viewTemplate = "view.hbs"
    constructor() {

    }
    classname(_class = this) {
        return _class.constructor.name.toLowerCase();
    }
    @exposed
    async view(key = undefined) {
        console.log(key)
        if (key !== undefined && !utils.isEmpty(key)) {
            return this.render(this.viewTemplate,await db.get(this.classname(), key));
        }
        return this.render();

    }
    render(template = this.indexTemplate,skel = {}) {
        let renderer = utils.getCurrentRender();
        switch (utils.getCurrentRenderName()) {
            case "json":
                return renderer.render(skel)
            case "html":
                return [template,skel]
            default:
                return json.render(skel)
        }
    }
}