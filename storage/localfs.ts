//Store Files in FileSystem
const multer = require('multer');
import * as path from 'path';
import * as fs from 'fs';
import { Error } from '../errors';
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
export async function sendFile(filedata, res) {

  var readStream = fs.createReadStream(path.join(__dirname, "/../", filedata["path"]));

  readStream.on('open', function () {
    res.writeHead(200, {
      "Content-Type": filedata["mimetype"],
      "Content-Disposition": "attachment; filename=" + filedata["filename"] + "." + filedata["mimetype"].split("/")[1]
    });
    readStream.pipe(res);
  });

  readStream.on('error', function (err) {
    throw new Error().notFound();
  });



}