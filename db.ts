import {
    Error
} from "./errors";
import {
    utils
} from "./utils";
var  query:any;
/**
 * this Class handle all db write and read stuff with mongodb 
 * Standart db is main
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
//Fixme Later in config file
const username = "myUserAdmin";
const password = "abc123";
const url = "127.0.0.1";
//const port=27017;
const dbconn = connectToDB().then(conn => conn);
export async function connectToDB(_url = undefined, dbName = "main") {
    // Replace the uri string with your MongoDB deployment's connection string.
    //const uri =`mongodb://${username}:${password}@${url}?retryWrites=true&writeConcern=majority`; // For local tests
    var url = _url || 'mongodb://localhost:27017/' + dbName;
    console.log(url)
    //const client = new MongoClient(uri);
    return MongoClient.connect(url)


}

export async function put(module, data) {
    var client = await connectToDB();
    var db = client.db();
    var keyPromies = new Promise((resolve, reject) => {
        db.collection(module).insertOne(data, function (err, res) {
            if (err) {
                reject();
            }
            client.close();
            resolve(res["insertedId"]);


        });
    });
    return keyPromies

}
export async function update(module, data, key) {
    key = {
        "_id": ObjectId(key)
    }
    var client = await connectToDB();
    var db = client.db();
    var successPromies = new Promise((resolve, reject) => {
        db.collection(module).updateOne(key, {
            $set: data
        }, function (err, res) {
            if (err) {
                resolve(false);
            }
            client.close();
            resolve(true);

        });
    });
    return successPromies

}
export async function remove(module, query) {
    if (typeof query == "string")
    {
        query = {
            "_id": ObjectId(query)
        }
    }
    
    var client = await connectToDB();
    var db = client.db();
    var successPromies = new Promise((resolve, reject) => {
        db.collection(module).deleteOne(query, function (err, res) {
            if (err) {
                resolve(false);
            }
            client.close();
            resolve(true);

        });
    });
    return successPromies

}

export async function get(module, query = {}, limit = 100) {

    var client = await dbconn; //await connectToDB();
    var db = client.db();
    var dataPromies = new Promise((resolve, reject) => {

        if (typeof query === "string") {
            console.log("key is string")
            query = {
                "_id": ObjectId(query)
            }
        }
        if (utils.isEmpty(query)) {
            console.log("query ERR")
        }
        db.collection(module).find(query).limit(limit).toArray(function (err, res) {
            if (err)
            {
                reject();
            }
            //client.close();
            if (res != null && res.length > 0) {

                if (res.length == 1) {
                    resolve(res[0]);

                }
                resolve(res);

            } else {
                resolve(null);
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