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
        return [404,this.value];
        
    }
    for()
    {
        return [404,this.value];
        
    }
    
}