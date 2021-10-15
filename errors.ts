
import * as utils from "./utils";

/**
 * Stanadart Handler for Errors
 */

export class Error
{
    value:any;
    constructor(data={})
    {
        this.value=data;
    }
    badRequest()
    {
        
        return [400,this.value];
    }
    unauthorized()
    {
        return this.render("errors/unauthorized.hbs",401); 
    }
    notFound()
    {
        return this.render("errors/notFound.hbs",404,{"msg":"Not found"}); 
    }
    render(template = "",statuscode=200, data={}) {

        let renderer = utils.getCurrentRender();
        switch (utils.getCurrentRenderName()) {
            case "json":
                return renderer.render(data)
            case "html":
                return [template, data,statuscode]

        }
    }
    
    
}