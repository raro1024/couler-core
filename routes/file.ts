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
import { Error } from "../errors";

const ObjectId = require('mongodb').ObjectId;


export const router = express.Router();
const mode=conf["storage.mode"];
const storagemodes={"local":storagelocal,"gridfs":storagegridfs}
router.use(bodyParser.urlencoded({extended: true}))
var upload = multer({ storage: storagemodes[mode]["storage"] })
router.put('/file/upload', upload.single('file'), async (req, res, next) => {

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
    
    
    var filedata = (await db.get("file",req.params.key))[0]
    if(!filedata)
    {
        new Error().send(404,"FILE not found",res)
    }
    if(filedata["mode"]==="gridfs")
    {
        console.log("Start to get file")
        storagemodes["gridfs"].sendFile({"_id": ObjectId(filedata["id"])},res)
    }
    if(filedata["mode"]==="local")
    {
        storagemodes["local"].sendFile(filedata,res)

    }
})
