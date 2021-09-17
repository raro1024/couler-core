/**
 * this Class handel all db write and read stuff with mongodb 
 * Standart db is main
 */
 const MongoClient = require('mongodb').MongoClient;
 //Fixme Later in config file
 const username="myUserAdmin";
 const password="abc123";
 const url="127.0.0.1";
 const port=27017;
class DB 
{
    constructor()
    {
        console.log("Start DB Conection");
        this.checkIfDBExist();
      
    }
async connectToDB(_url=undefined)
{  
// Replace the uri string with your MongoDB deployment's connection string.
    //const uri =`mongodb://${username}:${password}@${url}?retryWrites=true&writeConcern=majority`; // For local tests
    var url = _url||'mongodb://localhost:27017/';
    console.log(url)
    //const client = new MongoClient(uri);
    return  MongoClient.connect(url).catch(err =>{ console.log(err); });


}

async toDB(data, _collection) {
    var client = await this.connectToDB();
    const result = await client._collection.insertOne(data);
    console.log(result)
    return result;
}

async fromDB(_collection)
{
    return await _collection.find({}).toArray();

}
/**
 * Creates an new Database only if first Startup
 */
async createDB(dbName="main")
{
    
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/"+dbName;

MongoClient.connect(url, function (err, client) {
    var db = client.db(dbName);
    if (err) throw err;
    //customers is a collection we  want to create                             
    db.createCollection("user", function (err, result) {
        if (err) throw err;
        
        client.close();
    });
});
}
/**
 * 
 * @param {string} dbName Check if the Databse with the Name exist
 */
async checkIfDBExist(dbName="main",client=undefined)
{
    console.log("Check if db exist");
    var client = await this.connectToDB();
    var dbAdmin=client.db().admin();
    dbAdmin.listDatabases(function (err,databases) {
        var hasDB= false;
        databases.databases.forEach((_db)=>{
           if (_db.name==dbName)
           {
               hasDB=true;
            }
        })
        if(!hasDB)
        {
            _this.createDB();
        }
        else
        {
            console.log("Database exist")
        }
        });
   
}
}
module.exports = DB;