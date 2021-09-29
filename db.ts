/**
 * this Class handel all db write and read stuff with mongodb 
 * Standart db is main
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
//Fixme Later in config file
const username = "myUserAdmin";
const password = "abc123";
const url = "127.0.0.1";
//const port=27017;

async function connectToDB(_url = undefined, accesssDB = true) {
    // Replace the uri string with your MongoDB deployment's connection string.
    //const uri =`mongodb://${username}:${password}@${url}?retryWrites=true&writeConcern=majority`; // For local tests
    var url = _url || 'mongodb://localhost:27017/main';
    console.log(url)
    //const client = new MongoClient(uri);
    return MongoClient.connect(url)


}

export async function toDB(module, data) {

    var client = await connectToDB();
    var db = client.db();
    db.collection(module).insertOne(data, function (err, res) {
        if (err) throw err;
        client.close();
    });

}

export async function read(module, key) {


    var client = await connectToDB();
    var db = client.db();
    var dataPromies = new Promise((resolve, reject) => {
        console.log(typeof key)
        if (typeof key === "string") {
            key = {
                "_id": ObjectId(key)
            }
        }
        console.log(key);
        db.collection(module).findOne(key, function (err, res) {
            if (err) throw err;
            client.close();
            if (res != null) {
                resolve(res);
            } else {
                reject();
            }

        });

    });
    return dataPromies;

}
//get a list of data 
export async function list(module, limit = 99) {
    console.log("list data")
    var client = await connectToDB();
    var db = client.db();
    var dataPromies = new Promise((resolve, reject) => {
        db.collection(module).find({}).limit(limit).toArray(function (err, res) {
            if (err) throw err;
            client.close();
            if (res != null) {

                resolve(res);
            } else {
                reject();
            }

        });

    });
    return dataPromies;

}
/**
 * Creates an new Database only if first Startup
 */
async function createDB(dbName = "main") {

    var MongoClient = require('mongodb').MongoClient;

    var url = "mongodb://localhost:27017/" + dbName;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });

}
/**
 * 
 * @param {string} dbName Check if the Databse with the Name exist
 */
async function checkIfDBExist(dbName = "main", client = undefined) {
    console.log("Check if db exist");
    var client = await connectToDB();
    var dbAdmin = client.db().admin();
    dbAdmin.listDatabases(function (err, databases) {
        var hasDB = false;
        databases.databases.forEach((_db) => {
            if (_db.name == dbName) {
                hasDB = true;
            }
        })
        if (!hasDB) {
            //_this.createDB();
        } else {
            console.log("Database exist")
        }
    });

}
export * as db from "./db";