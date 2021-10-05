/**
 * This Module handel the Fileupload stuff (upload)
 */

import * as express from "express";
import * as multer from "multer";
import * as bodyParser from "body-parser";
import * as storagelocal from "../storage/localfs";
import * as storagegridfs from "../storage/gridfs";
import { db } from "../db";
import { conf } from "../conf";

const ObjectId = require('mongodb').ObjectId;


export const router = express.Router();
const mode=conf["storage.mode"];
const storagemodes={"local":storagelocal,"gridfs":storagegridfs}
router.use(bodyParser.urlencoded({extended: true}))
var upload = multer({ storage: storagemodes[mode]["storage"] })
router.post('/file/upload', upload.single('myFile'), async (req, res, next) => {

    const file:any = req.file
    if (!file) {
     
        res.send("err")
    }
    var data ={}
    console.log(file)
    if (mode=="local")
    {
        data ={
            "path":file.path
        }
    }
    if(mode=="gridfs")
    {
        data ={

            "id":file.id
        }
    }
    data["mode"]=mode
    data["mimetype"]=file.mimetype
    data["filename"]=file.filename
    var obj={}
    obj["downloadURL"]="/file/download/"+await db.put("file",data).then(key=>key)
    obj["mimetype"]=file.mimetype
    obj["encoding"]=file.encoding
    obj["filename"]=file.filename

    res.send(obj)
})
router.get('/file/download/:key', async(req, res) => {
    var filedata = await db.get("file",req.params.key)
    if(filedata["mode"]==="gridfs")
    {
        storagemodes[mode].sendFile({"_id": ObjectId(filedata["id"])},res)
    }
    if(filedata["mode"]==="local")
    {
        console.log(filedata)
        storagemodes[mode].sendFile(filedata,res)

    }
})
