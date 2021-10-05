/**
 * This Module handel the Fileupload stuff (upload)
 */

import * as express from "express";
import * as multer from "multer";
import * as bodyParser from "body-parser";
import * as storagelocal from "../storage/localfs";
import * as storagegridfs from "../storage/gridfs";
import { db } from "../db";

const ObjectId = require('mongodb').ObjectId;


export const router = express.Router();
const mode="local"
const storagemodes={"local":storagelocal,"gridfs":storagegridfs}
router.use(bodyParser.urlencoded({extended: true}))
var upload = multer({ storage: storagemodes[mode]["storage"] })
router.post('/file/upload', upload.single('myFile'), (req, res, next) => {

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
  
    db.put("file",data)
    data["mode"]=mode
    data["mimetype"]=file.mimetype
    res.send(file)
})
router.get('/file/download/:key', async(req, res) => {
    var filedata = await db.get("file",req.params.key)
    if(filedata["mode"]==="gridfs")
    {
        storagemodes[mode].sendFile({"_id": ObjectId(filedata["id"])},res)
    }
    if(filedata["mode"]==="local")
    {
        storagemodes[mode].sendFile(filedata,res)

    }
})
