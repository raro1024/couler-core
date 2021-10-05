import {
    db
} from "../db";


//Store Files in Mongo DB
const {
    GridFsStorage
} = require('multer-gridfs-storage');

var mongodb = require('mongodb');


export const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/core-file-storage",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {

        const filename = `${Date.now()}-core-${file.originalname}`;
        return filename;

    }
});
export async function sendFile(key, res) {


    var client = await db.connectToDB(undefined, "core-file-storage");
    var db_ = client.db();


    var bucket = new mongodb.GridFSBucket(db_, {
        chunkSizeBytes: 1024,
        bucketName: 'fs'
    });
    bucket.find(key).toArray((err, files) => {
        bucket.openDownloadStreamByName(files[0]["filename"]).pipe(res);
    });



}