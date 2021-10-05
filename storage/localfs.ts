//Store Files in FileSystem
const multer = require('multer');
import * as path from 'path';
import * as fs from 'fs';
export const  storage=   multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  export async function sendFile(filedata, res) {


    res.writeHead(200, {
        "Content-Type": filedata["mimetype"],
        "Content-Disposition": "attachment; filename=" + filedata["filename"]
    });
    fs.createReadStream(path.join(__dirname,"/../",  filedata["path"])).pipe(res);



}