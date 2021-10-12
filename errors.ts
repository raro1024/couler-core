import { json } from "./routes/json";
import { utils } from "./utils";

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
        
        return [401,this.value];
    }
    notFound()
    {
        console.log( utils.getCurrentRenderName())
        return this.render("errors/notFound.hbs",404); 
    }
    for()
    {
        return [404,this.value];
        
    }
    render(template = "",statuscode=200, data={}) {

        let renderer = utils.getCurrentRender();
        switch (utils.getCurrentRenderName()) {
            case "json":
                return renderer.render(data)
            case "html":
                return [template, data,statuscode]
            default:
                return json.render(data)
        }
    }
    
    
}