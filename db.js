/**
 * this Class handel all db write and read stuff with mongodb 
 * Standart db is main
 */
 const {MongoClient} = require('mongodb');
class DB 
{
    constructor()
    {
        console.log("Start DB Conection");
        this.connectToDB();
       
    }
async connectToDB()
{  
// Replace the uri string with your MongoDB deployment's connection string.
    const uri ="mongodb://myUserAdmin:abc123@127.0.0.1?retryWrites=true&writeConcern=majority"; // For local tests
    const client = new MongoClient(uri);


    this.client=await client.connect();
    this.listDatabases();
    console.log("DB Connection established")

}
async  listDatabases(){
    var databasesList = await this.client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async toDB(data, database) {

        const result = await _collection.insertOne(data);
        console.log(result)
        return result;
}

async fromDB(_collection)
{
    return await _collection.find({}).toArray();

}
}
module.exports = DB;