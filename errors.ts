/**
 * Stanadart Handler for Errors
 */
export class Error
{
    value:any;
    constructor()
    {
        this.value;
    }
    read()
    {
        return this.value;
    }
    json(data)
    {
        this.value=data;
        
    }
    notFound()
    {
        return [404,"test"];
        
    }
}