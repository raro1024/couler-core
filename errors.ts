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
    notFound()
    {
        return [404,"test"];
        
    }
}